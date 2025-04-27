import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Semester 1
  const semester = await prisma.semester.findFirst({
    where: {
      id: 1,
    },
  });

  if (!semester) {
    return;
  }

  // Add 6 Subjects for Semester 1
  await prisma.subject.createMany({
    data: [
      { name: "Programming Fundamentals", code: 101, semesterId: semester.id },
      { name: "Mathematics 1", code: 102, semesterId: semester.id },
      { name: "English Communication", code: 103, semesterId: semester.id },
      { name: "Physics", code: 104, semesterId: semester.id },
      { name: "Environmental Science", code: 105, semesterId: semester.id },
      { name: "Engineering Graphics", code: 106, semesterId: semester.id },
    ],
  });

  console.log("6 Subjects inserted!");

  // Fetch all 6 created subjects
  const createdSubjects = await prisma.subject.findMany({
    where: { semesterId: semester.id },
  });

  // Add Materials for each Subject
  for (const subject of createdSubjects) {
    await prisma.material.createMany({
      data: [
        {
          title: "Lecture Notes",
          url: "https://example.com/notes.pdf",
          description: `Notes for ${subject.name}`,
          subjectId: subject.id,
          type: "NOTES",
        },
        {
          title: "Syllabus Document",
          url: "https://example.com/syllabus.pdf",
          description: `Syllabus for ${subject.name}`,
          subjectId: subject.id,
          type: "SYLLABUS",
        },
      ],
    });
  }

  console.log("Materials inserted for all 6 subjects!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
