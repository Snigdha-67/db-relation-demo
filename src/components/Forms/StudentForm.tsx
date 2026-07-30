"use client";

import { studentFormSchema, StudentFormType } from "@/lib/zodSchema";
import { createStudent } from "@/server/createStudent";
import { Teacher } from "@generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

type StudentFormProps = {
  teachers: Teacher[];
};

const StudentForm = ({ teachers }: StudentFormProps) => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      teacherId: "",
    },
    mode: "all",
  });

  const createStudentFormHandler = async (csfData: StudentFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { isSuccess, messege } = await createStudent(csfData);

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
      onSubmit={handleSubmit(createStudentFormHandler)}
      className="grid gap-4"
      noValidate>
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
          disabled={isSubmitting}>
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

export default StudentForm;
