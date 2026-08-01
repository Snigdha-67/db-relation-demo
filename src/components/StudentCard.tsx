import { StudentGetPayload } from "@generated/prisma/models";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Avatar, AvatarImage } from "./shadcnui/avatar";
import { Badge } from "./shadcnui/badge";
import { buttonVariants } from "./shadcnui/button";
import { Card, CardContent, CardFooter } from "./shadcnui/card";

type StudentCardProps = {
  student: StudentGetPayload<{
    include: {
      teacher: true;
    };
  }>;
};

const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Card className="w-xs">
      <CardContent className="grid place-items-center gap-4">
        <Avatar className={"size-64"}>
          <AvatarImage src={student.imageUrl} />
        </Avatar>
        <div className="text-3xl font-semibold">{student.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{student.teacher.name}</span>
          <Badge
            variant="default"
            className="h-6 text-lg">
            {student.teacher.subject}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4">
        <DeleteButton />
        <Link
          href={`/${student.id}`}
          className={buttonVariants({ variant: "secondary", size: "lg" })}>
          <PenBoxIcon /> Edit
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
