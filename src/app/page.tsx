import { Card, CardContent } from "@/components/shadcnui/card";
import StudentCard from "@/components/StudentCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View | DB Relation",
  description: "View page of DB Relation app.",
};

const page = async () => {
  const allStudents = await prisma.student.findMany({
    include: {
      teacher: true,
    },
  });

  // console.log(allStudents);

  if (allStudents.length === 0) {
    return (
      <section className="grid h-dvh place-items-center">
        <Card>
          <CardContent>No Student Found</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 place-items-center gap-8 pt-24 pb-8 md:grid-cols-2 lg:grid-cols-3">
      {allStudents.map((item) => (
        <StudentCard
          key={item.id}
          student={item}
        />
      ))}
    </section>
  );
};

export default page;
