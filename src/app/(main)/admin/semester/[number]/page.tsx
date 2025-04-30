import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/utils/prisma";
import { DeleteIcon, EditIcon } from "lucide-react";
import React from "react";

interface AdminSemesterPageProps {
  params: {
    number: number;
  };
}

const AdminSemesterPage = async ({ params }: AdminSemesterPageProps) => {
  const subjects = await prisma.subject.findMany({
    where: {
      semesterId: Number(params.number),
    },
    include: {
      Material: true,
    },
  });
  return (
    <div className="w-full space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-primary text-3xl font-bold tracking-tight">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Modify a subject and its materials
          </p>
        </div>
        <Button>Add Subject</Button>
      </div>

      <div className="space-y-5">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-primary text-xl font-semibold">
                    Semester {params.number}
                  </CardTitle>
                  <CardDescription className="flex gap-3">
                    <Badge variant="secondary">Code: {subject.code}</Badge>
                    <Badge variant="secondary">{subject.Material.length}</Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="icon" variant="secondary">
                    <EditIcon />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-primary/75 text-lg font-bold tracking-tight">
                    Subject {params.number} Materials
                  </h1>
                </div>
                <Button size="sm">Add Subject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSemesterPage;
