import { Card, CardContent } from "@/components/shadcnui/card";
import StudentCard from "@/components/StudentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View | DB Relation",
  description: "View page of DB Relation app.",
};

const page = () => {
  const allStudents = [1, 2, 3];

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
      {allStudents.map(() => (
        <StudentCard key={""} />
      ))}
    </section>
  );
};

export default page;
