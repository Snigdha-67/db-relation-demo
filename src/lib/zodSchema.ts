import z from "zod";

export const teacherFormSchema = z.object({
  name: z
    .string()
    .min(6, { error: "Too short. Enter at least 6 characters" })
    .max(32, { error: "Limit reached: 32 characters max" }),
  subject: z.string().min(4, { error: "Subject Required" }),
});

export type TeacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  name: z
    .string()
    .min(6, { error: "Too short. Enter at least 6 characters" })
    .max(32, { error: "Limit reached: 32 characters max" }),
  teacherId: z.string().min(4, { error: "Teacher Required" }),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;
