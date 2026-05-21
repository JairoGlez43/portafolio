import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(80),
  email: z.email("Email no válido").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntame un poco más (mínimo 20 caracteres)")
    .max(2000),
  // Honeypot field — checked manually in the route to silently 200-return bots
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
