"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";

export const editAvatar = async (
  studentId: string,
  prevImageUrl: string,
  avatarImg: File,
) => {
  try {
    await rm(`./public${prevImageUrl}`);

    const imageName = `${crypto.randomUUID()}.jpeg`;

    await sharp(await avatarImg.arrayBuffer())
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

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        imageUrl,
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      messege: "Avatar Updated Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "🚨 Avatar Updatation Failed 🚨",
    };
  }
};
