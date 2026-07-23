import TeacherForm from "@/components/Forms/TeacherForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Create | DB Relation",
  description: "Teacher Create page of DB Relation app.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Teacher</CardTitle>
        </CardHeader>

        <Separator />

        <TeacherForm />
      </Card>
    </section>
  );
};

export default page;
