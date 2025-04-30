import prisma from "@/utils/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  DownloadIcon,
  FileClockIcon,
  FileSpreadsheetIcon,
  FileText,
  GhostIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";

interface SemesterPageProps {
  params: {
    number: number;
  };
}

const SemesterPage = async ({ params }: SemesterPageProps) => {
  const subjects = await prisma.subject.findMany({
    where: {
      semesterId: Number(params.number),
    },
    include: {
      Material: true,
    },
  });

  if (!subjects || subjects.length === 0) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-6">
        <GhostIcon className="text-muted-foreground h-16 w-16" />
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">No Subjects Found</h1>
          <p className="text-muted-foreground">
            Looks like there are no subjects available for Semester{" "}
            {params.number}.
          </p>
        </div>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  const getMaterialType = (type: string) => {
    switch (type) {
      case "NOTES":
        return <BookOpenIcon className="text-primary size-5" />;
      case "SYLLABUS":
        return <FileSpreadsheetIcon className="text-primary size-5" />;
      case "LECTURE":
        return <VideoIcon className="text-primary size-5" />;
      case "PREVIOUS_PAPER":
        return <FileClockIcon className="text-primary size-5" />;
      default:
        return <FileText className="text-primary size-5" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          Semester {params.number}
        </h1>
        <p className="text-muted-foreground">
          Select a subject to view its materials
        </p>
      </div>
      <div className="overflow-x-auto pb-2">
        <Tabs defaultValue={subjects[0].id.toString()}>
          <TabsList className="h-auto w-full justify-start space-x-2 p-1">
            {subjects.map((subject) => (
              <TabsTrigger
                value={subject.id.toString()}
                key={subject.id}
                className="data-[state=active]:bg-card cursor-pointer rounded-md px-4 py-1.5"
              >
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {subjects.map((subject) => (
            <TabsContent
              value={subject.id.toString()}
              key={subject.id}
              className="w-full pt-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {subject.Material.map((material) => (
                  <Card key={material.id}>
                    <CardHeader className="flex items-center gap-3">
                      <div className={`bg-primary/10 w-fit rounded-md p-3`}>
                        {getMaterialType(material.type)}
                      </div>
                      <div className="space-y-1">
                        <CardTitle>{material.title}</CardTitle>
                        <CardDescription>
                          {material.type.toString().toLowerCase()} of{" "}
                          {subject.name}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Badge variant="secondary">{material.type}</Badge>
                      <Button>
                        <DownloadIcon />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SemesterPage;
