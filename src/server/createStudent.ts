"use server";

import prisma from "@/lib/database/dbClient";
import { StudentFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const createStudent = async (
  { name, teacherId }: StudentFormType,
  avatarImg: File,
) => {
  try {
    const imgArrayBuffer = await avatarImg.arrayBuffer();

    const imageName = `${crypto.randomUUID()}.jpeg`;

    await sharp(imgArrayBuffer)
      .resize({
        width: 256,
        height: 256,
      })
      .jpeg({
        mozjpeg: true,
        quality: 97,
      })
      .toFile(`./public/uploads/${imageName}`);

    const imageUrl = `/uploads/${imageName}`;

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
