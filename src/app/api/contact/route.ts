import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const TO_EMAIL = "jarioglez1999@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portafolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validación fallida",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot caught a bot
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Mock-mode: log and return ok in development. In production, fail loud.
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY missing — mock send", {
        name,
        email,
        message,
      });
      return NextResponse.json({ ok: true, mock: true });
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          "El servicio de email no está configurado todavía. Contáctame directamente por email.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto desde el portafolio — ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">Nuevo mensaje desde el portafolio</h2>
          <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
          <div style="white-space: pre-wrap; padding: 16px; border-left: 3px solid #60a5fa; background: #f8fafc; color: #0f172a;">
            ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "No se pudo enviar el mensaje. Intenta de nuevo." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Error inesperado al enviar el mensaje." },
      { status: 500 },
    );
  }
}
