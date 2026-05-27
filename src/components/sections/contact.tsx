"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { createContactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const initialForm: ContactInput = {
  name: "",
  email: "",
  message: "",
  company: "",
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export function Contact({ dictionary }: { dictionary: Dictionary["contact"] }) {
  const [form, setForm] = useState<ContactInput>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleChange =
    (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const contactSchema = createContactSchema(dictionary.form.validation);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? dictionary.form.defaultError,
        });
        return;
      }

      setStatus({ kind: "success" });
      setForm(initialForm);
    } catch {
      setStatus({
        kind: "error",
        message: dictionary.form.networkError,
      });
    }
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mb-4 font-mono text-sm text-muted-foreground"
          >
            <span className="text-accent text-base">·</span> {dictionary.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={transition}
            id="contacto-titulo"
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {dictionary.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="text-lg text-muted-foreground"
          >
            {dictionary.description}
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={transition}
            className="mt-4 text-sm text-muted-foreground"
          >
            {dictionary.directEmailPrefix}{" "}
            <a
              href="mailto:jairo.front.dev@gmail.com"
              className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              jairo.front.dev@gmail.com
            </a>
            .
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-xl border border-border bg-muted/20 p-6 sm:p-8"
        >
          {/* Honeypot — hidden from users, traps bots */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">{dictionary.form.honeypotLabel}</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company ?? ""}
              onChange={handleChange("company")}
            />
          </div>

          <Field
            id="name"
            label={dictionary.form.nameLabel}
            value={form.name}
            error={errors.name}
            onChange={handleChange("name")}
            autoComplete="name"
            disabled={status.kind === "submitting"}
          />

          <Field
            id="email"
            label={dictionary.form.emailLabel}
            type="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange("email")}
            autoComplete="email"
            disabled={status.kind === "submitting"}
          />

          <FieldTextarea
            id="message"
            label={dictionary.form.messageLabel}
            value={form.message}
            error={errors.message}
            onChange={handleChange("message")}
            disabled={status.kind === "submitting"}
            rows={6}
            placeholder={dictionary.form.messagePlaceholder}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <SubmitButton status={status} dictionary={dictionary.form} />
            <StatusMessage status={status} dictionary={dictionary.form} />
          </div>
        </motion.form>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

interface FieldProps {
  id: keyof ContactInput;
  label: string;
  type?: string;
  value: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field({
  id,
  label,
  type = "text",
  value,
  error,
  autoComplete,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium tracking-tight"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "block w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
          error ? "border-red-500/60" : "border-border",
          disabled && "opacity-60",
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends Omit<FieldProps, "onChange" | "type"> {
  rows: number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FieldTextarea({
  id,
  label,
  value,
  error,
  disabled,
  rows,
  placeholder,
  onChange,
}: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium tracking-tight"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "block w-full resize-y rounded-md border bg-background px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
          error ? "border-red-500/60" : "border-border",
          disabled && "opacity-60",
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({
  status,
  dictionary,
}: {
  status: Status;
  dictionary: Dictionary["contact"]["form"];
}) {
  const submitting = status.kind === "submitting";
  return (
    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {submitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {dictionary.submitSubmitting}
        </>
      ) : (
        <>
          {dictionary.submitIdle}
          <Send className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

function StatusMessage({
  status,
  dictionary,
}: {
  status: Status;
  dictionary: Dictionary["contact"]["form"];
}) {
  if (status.kind === "success") {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
      >
        <CheckCircle2 className="h-4 w-4" />
        {dictionary.success}
      </p>
    );
  }
  if (status.kind === "error") {
    return (
      <p
        role="alert"
        className="inline-flex items-center gap-1.5 text-sm text-red-400"
      >
        <AlertCircle className="h-4 w-4" />
        {status.message}
      </p>
    );
  }
  return null;
}
