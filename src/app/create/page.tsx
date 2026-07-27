import StudentForm from "@/components/Forms/StudentForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Create | DB Relation",
  description: "Student Create page of DB Relation app.",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Student Login</CardTitle>
        </CardHeader>

        <Separator />

        <StudentForm />
      </Card>
    </section>
  );
};

export default page;
