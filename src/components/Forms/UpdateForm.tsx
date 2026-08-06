"use client";

import { studentFormSchema, StudentFormType } from "@/lib/zodSchema";
import { editStudent } from "@/server/editStudent";
import { Student, Teacher } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
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
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: sData.name,
      teacherId: sData.teacherId,
    },
    mode: "all",
  });

  const updateStudentFormHandler = async (usfData: StudentFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { isSuccess, messege } = await editStudent(
      sData.id,
      // sData.imageUrl,
      usfData,
      // plainFiles[0],
    );

    if (isSuccess) {
      reset();
      toast.success(messege);
      push("/");
    } else {
      toast.error(messege);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateStudentFormHandler)}
      className="grid gap-4"
      noValidate>
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

      <Button
        type="submit"
        className={"w-full"}
        disabled={isSubmitting || !isDirty}>
        {isSubmitting ?
          <>
            <LoaderIcon className="animate-spin" /> Updating..
          </>
        : <>
            <UserPlus2Icon /> Update
          </>
        }
      </Button>
    </form>
  );
};

export default UpdateForm;
