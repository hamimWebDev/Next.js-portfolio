import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  tags: z
    .string()
    .transform((value) => value.split(",").map((tag) => tag.trim()))
    .refine((tags) => tags.length > 0, {
      message: "At least one tag is required",
    }),
});
