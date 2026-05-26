import { z } from "zod";

export interface ContactValidationMessages {
  nameMin: string;
  emailInvalid: string;
  messageMin: string;
}

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(80),
    email: z.email(messages.emailInvalid).max(160),
    message: z.string().trim().min(20, messages.messageMin).max(2000),
    // Honeypot field — checked manually in the route to silently 200-return bots
    company: z.string().optional(),
  });
}

export const contactSchema = createContactSchema({
  nameMin: "Mínimo 2 caracteres",
  emailInvalid: "Email no válido",
  messageMin: "Cuéntame un poco más (mínimo 20 caracteres)",
});

export type ContactInput = z.infer<typeof contactSchema>;
