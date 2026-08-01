import UpdateForm from "@/components/Forms/UpdateForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Separator } from "@/components/shadcnui/separator";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPDATE - DB Relation",
  description: "Update page of DB Relation",
};

type EditProps = {
  params: Promise<{ sId: string }>;
};

const page = async ({ params }: EditProps) => {
  const { sId } = await params;

  const student = await prisma.student.findUniqueOrThrow({
    where: {
      id: sId,
    },
  });

  const allTeachers = await prisma.teacher.findMany();

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Update User Details
          </CardTitle>
        </CardHeader>

        <Separator />

        <UpdateForm
          sData={student}
          teachers={allTeachers}
        />
      </Card>
    </section>
  );
};

export default page;
