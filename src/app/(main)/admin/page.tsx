import prisma from "@/utils/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookX, ArrowRight, Library } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async () => {
  const semesters = await prisma.semester.findMany({
    include: {
      Subject: true,
    },
  });
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Admin Portal
        </h1>
        <p className="text-muted-foreground">
          Select a subject to view its materials
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {semesters.map((semester) => (
          <Card key={semester.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Library className="text-primary size-5" />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-lg font-semibold">
                    Semester {semester.number}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {semester.Subject.length} subject
                    {semester.Subject.length !== 1 ? "s" : ""}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="flex-1">
                {semester.Subject.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {semester.Subject.slice(0, 6).map((subject) => (
                      <Badge
                        key={subject.id}
                        variant="outline"
                        className="text-foreground/75"
                      >
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted flex h-full items-center justify-center rounded-lg border border-dashed p-4">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <BookX className="h-4 w-4" />
                      <span className="text-sm">No subjects added</span>
                    </div>
                  </div>
                )}
              </div>

              <Link href={`/admin/semester/${semester.id}`}>
                <Button
                  className="mt-3 flex w-full justify-center gap-3"
                  size="sm"
                >
                  Manage Semester
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
