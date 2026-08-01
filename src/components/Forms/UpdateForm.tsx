"use client";

import { studentFormSchema, StudentFormType } from "@/lib/zodSchema";
import { Student, Teacher } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldContent, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";

type UpdateFormProps = {
  sData: Student;
  teachers: Teacher[];
};

const UpdateForm = ({ sData, teachers }: UpdateFormProps) => {
  const [isFile, setIsFile] = useState(false);

  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: sData.name,
      teacherId: sData.teacherId,
    },
    mode: "all",
  });

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

  const updateStudentFormHandler = async (usfData: StudentFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    // const { isSuccess, messege } = await createStudent(csfData, plainFiles[0]);

    // if (isSuccess) {
    //   reset();
    //   toast.success(messege);
    //   push("/");
    // } else {
    //   toast.error(messege);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(updateStudentFormHandler)}
      className="grid gap-4"
      noValidate>
      <div className="grid place-items-center">
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
      </div>

      <CardContent className="space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Full Name"
                autoComplete="name"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="teacherId"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="responsive"
              data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel>Teacher</FieldLabel>
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                items={teachers.map((teacher) => ({
                  label: teacher.name, // adjust to your schema field (e.g. teacher.fullName)
                  value: String(teacher.id),
                }))}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map(({ id, name, subject }) => (
                    <SelectItem
                      key={id}
                      value={id}>
                      {name} ({subject})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className={"w-full"}
          disabled={isSubmitting || !isFile}>
          {isSubmitting ?
            <>
              <LoaderIcon className="animate-spin" /> Creating..
            </>
          : <>
              <UserPlus2Icon /> Create
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateForm;
