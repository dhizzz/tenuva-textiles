import { z } from "zod";

const email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Messages are error keys, resolved to the active language in the UI. */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "required"),
  company: z.string().trim().min(1, "required"),
  email: z.string().trim().min(1, "required").regex(email, "email"),
  phone: z.string().trim().min(5, "required"),
  country: z.string().trim().min(1, "required"),
  interest: z.string().optional(),
  volume: z.string().optional(),
  message: z.string().optional(),
  confirm: z.boolean().refine((v) => v === true, "confirm"),
});

export type InquiryValues = z.infer<typeof inquirySchema>;
export type InquiryType = "quote" | "swatches" | "partner";
