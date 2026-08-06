"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

export const deleteStudent = async (
  studentId: string,
  studentImageUrl: string,
) => {
  try {
    await rm(`./public${studentImageUrl}`);

    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      messege: "Student Deleted Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "🚨 Student Deletation Failed 🚨",
    };
  }
};
