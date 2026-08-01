"use client";

import { teacherFormSchema, TeacherFormType } from "@/lib/zodSchema";
import { createTeacher } from "@/server/createTeacher";
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

const TeacherForm = () => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      subject: "",
    },
    mode: "all",
  });

  const createTeacherFormHandler = async (ctfData: TeacherFormType) => {
    await new Promise((r) => setTimeout(r, 1000));

    const { isSuccess, messege } = await createTeacher(ctfData);

    if (isSuccess) {
      reset();
      toast.success(messege);
      push("/create");
    } else {
      toast.error(messege);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createTeacherFormHandler)}
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
          name="subject"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              orientation="responsive"
              data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel>Subject</FieldLabel>
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="History 🚨">History 🚨 </SelectItem>
                  <SelectItem value="Math 🚨">Math 🚨</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
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

export default TeacherForm;
