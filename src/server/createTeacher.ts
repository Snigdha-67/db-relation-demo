"use server";

import prisma from "@/lib/database/dbClient";
import { TeacherFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createTeacher = async (ctfData: TeacherFormType) => {
  try {
    await prisma.teacher.create({
      data: ctfData,
    });

    revalidatePath("/");
    revalidatePath("/create");

    return {
      isSuccess: true,
      messege: "Teacher created Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "🚨 Teacher Creation Failed 🚨",
    };
  }
};
