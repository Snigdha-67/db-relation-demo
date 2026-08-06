"use server";

import prisma from "@/lib/database/dbClient";
import { StudentFormType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export const editStudent = async (
  studentId: string,
  usfData: StudentFormType,
) => {
  try {
    // await rm(`./public${prevImageUrl}`);

    // const imageName = `${crypto.randomUUID()}.jpeg`;

    // await sharp(await avatarImg.arrayBuffer())
    //   .resize({
    //     width: 256,
    //     height: 256,
    //   })
    //   .jpeg({
    //     mozjpeg: true,
    //     quality: 97,
    //   })
    //   .toFile(`./public/uploads/${imageName}`);

    // const imageUrl = `/uploads/${imageName}`;

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        name: usfData.name,
        teacherId: usfData.teacherId,
        // imageUrl: imageUrl,
      },
    });

    revalidatePath("/");
    return {
      isSuccess: true,
      messege: "User Updated Successfully ✅",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      messege: "🚨 User Updatation Failed 🚨",
    };
  }
};
