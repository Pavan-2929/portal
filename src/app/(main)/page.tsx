import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Library,
  Notebook,
  Code,
  Network,
  GraduationCap,
  Cpu,
} from "lucide-react";
import Link from "next/link";

const semesters = [
  {
    number: 1,
    title: "Programming Fundamentals",
    description:
      "Learn basic programming concepts and problem-solving techniques",
    icon: <Code className="h-5 w-5" />,
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    number: 2,
    title: "Object-Oriented Concepts",
    description: "Master classes, inheritance and polymorphism principles",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-green-100 dark:bg-green-900/30",
  },
  {
    number: 3,
    title: "Data Structures",
    description: "Study arrays, linked lists, trees and graph structures",
    icon: <Library className="h-5 w-5" />,
    color: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    number: 4,
    title: "Database Systems",
    description: "Explore SQL queries and database design principles",
    icon: <Notebook className="h-5 w-5" />,
    color: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    number: 5,
    title: "Operating Systems",
    description: "Understand processes, threads and memory management",
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-red-100 dark:bg-red-900/30",
  },
  {
    number: 6,
    title: "Computer Networks",
    description: "Learn about protocols and network architecture layers",
    icon: <Network className="h-5 w-5" />,
    color: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    number: 7,
    title: "Software Engineering",
    description: "Study development methodologies and best practices",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    number: 8,
    title: "Capstone Project",
    description: "Implement your final year research project work",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-teal-100 dark:bg-teal-900/30",
  },
];

const Page = async () => {
  return (
    <>
      <div className="space-y-10">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-primary text-2xl font-bold md:text-3xl">
            Study Materials
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse all course materials organized by semester.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {semesters.map((semester) => (
            <Card
              key={semester.number}
              className="flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex items-center gap-3">
                <div className={`${semester.color} w-fit rounded-md p-3`}>
                  {semester.icon}
                </div>
                <div className="space-y-1">
                  <CardTitle>Semester - {semester.number}</CardTitle>
                  <CardDescription>{semester.title}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-muted-foreground mb-4 text-sm">
                  {semester.description}
                </p>
                <Link href={`semester/${semester.number}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group flex w-full"
                  >
                    View Materials
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
