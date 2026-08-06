"use client";

import { editAvatar } from "@/server/editAvatar";
import { Student } from "@generated/prisma/client";
import { LoaderIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";

type UpdateAvatarProps = {
  sData: Student;
};

const UpdateAvatar = ({ sData }: UpdateAvatarProps) => {
  const [isFile, setIsFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    validators: [
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 /* 5 MB */ }),
    ],
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

  const updateStudentAvatarHandler = async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const { isSuccess, messege } = await editAvatar(
      sData.id,
      sData.imageUrl,
      plainFiles[0],
    );

    if (isSuccess) {
      toast.success(messege);
      push("/");
    } else {
      toast.error(messege);
    }

    setLoading(false);
  };

  return (
    <div className="grid place-items-center gap-4">
      {!isFile && (
        <button
          type="button"
          onClick={openFilePicker}>
          <Avatar className={"size-64"}>
            <AvatarImage src={sData.imageUrl} />
          </Avatar>
        </button>
      )}

      {filesContent.map(({ content, name }) => (
        <button
          key={name}
          type="button"
          onClick={openFilePicker}>
          <Avatar className={"size-64"}>
            <AvatarImage src={content} />
          </Avatar>
        </button>
      ))}

      {isFile && (
        <Button
          type="button"
          onClick={updateStudentAvatarHandler}
          className={"w-full"}
          disabled={loading}>
          {loading ?
            <>
              <LoaderIcon className="animate-spin" /> Updating..
            </>
          : <>
              <UserPlus2Icon /> Update
            </>
          }
        </Button>
      )}
    </div>
  );
};

export default UpdateAvatar;
