import z from "zod";

export const teacherFormSchema = z.object({
  name: z.string(),
  subject: z.string(),
});

export type TeacherFormType = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  name: z.string(),
  teacherId: z.string(),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;
