"use server";

import prisma from "@/lib/database/dbClient";
import { StudentFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const createStudent = async ({ name, teacherId }: StudentFormType) => {
  const imageUrl = `https://i.pravatar.cc/300`;

  try {
    await prisma.student.create({
      data: {
        name,
        imageUrl,
        teacherId,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      messege: "Student created Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "🚨 Student Creation Failed 🚨",
    };
  }
};
