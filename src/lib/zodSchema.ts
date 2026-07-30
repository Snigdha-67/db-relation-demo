import z from "zod";

export const teacherFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Too short. Enter at least 2 characters" })
    .max(12, { error: "Limit reached: 12 characters max" }),
  subject: z.string().min(4, { error: "Subject Required" }),
});

export type TeacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Too short. Enter at least 2 characters" })
    .max(12, { error: "Limit reached: 12 characters max" }),
  teacherId: z.string().min(4, { error: "Teacher Required" }),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;
