import { z } from "zod";

export const experienceValidationSchema = z.object({
  type: z.literal("experience").optional(), // Ensures the type is exactly "experience"
  company: z.string().min(1, "Company name is required."), // At least one character
  position: z.string().min(2, "Position must be at least 2 characters."), // At least 2 characters
  duration: z.string().min(1, { message: "Duration is required" }).max(100, {
    message: "Duration must follow the format: 'Jan 2022 - Dec 2023'",
  }),
  description: z
    .string()
    .min(3, "Description must be at least 10 characters.") // Minimum length
    .max(500, "Description cannot exceed 500 characters."), // Optional maximum length
});
export const workValidationSchema = z.object({
  category: z.string().min(1, "Category is required."), 
  title: z.string().min(1, "Title is required."),
  frontend: z.string().optional(),
  backend: z.string().optional(),
  liveLink: z.string(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description cannot exceed 500 characters."),
});

export const educationValidationSchema = z.object({
  type: z.literal("education").optional(),
  institution: z
    .string()
    .min(1, { message: "Institution name is required" })
    .max(100, { message: "Institution name must be less than 100 characters" }),
  qualification: z
    .string()
    .min(1, { message: "Qualification is required" })
    .max(100, { message: "Qualification must be less than 100 characters" }),
  duration: z.string().min(1, { message: "Duration is required" }).max(100, {
    message: "Duration must follow the format: 'Jan 2022 - Dec 2023'",
  }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
});

export const skillValidationSchema = z.object({
  type: z.literal("skill").optional(), // Ensures the type is always "skill"
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or less" }),
  duration: z.string().min(1, { message: "Duration is required" }).max(100, {
    message: "Duration must follow the format: 'Jan 2022 - Dec 2023'",
  }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be 500 characters or less" }),
});
