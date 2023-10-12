import { Prisma, PrismaClient, status } from "@prisma/client";
import { Types } from "@prisma/client/runtime/library";

async function addAttendance(prisma: PrismaClient, studentLrn: number) {
  try {
    const attendance = await prisma.attendance.create({
      data: {
        student_id: studentLrn,
        attendance_status:
          (await prisma.$queryRaw`SELECT LOCALTIME < '07:00:00'`)
            ? status.LATE
            : status.ONTIME,
      },
    });
    return [0, attendance];
  } catch (error) {
    return [error, null];
  }
}

async function getAttendance(prisma: PrismaClient) {
  try {
    const attendance = await prisma.attendance.findMany();
    return attendance;
  } catch (error) {
    console.log(error);
  }
}

async function getAttendanceSection(
  prisma: PrismaClient,
  section: string,
  date: Date | undefined
) {
  try {
    const attendance =
      await prisma.$queryRaw(Prisma.sql`SELECT * FROM attendance
    INNER JOIN students
    ON students.lrn = attendance.student_id
    WHERE section_id = ${section.toUpperCase()}`);

    console.log(attendance);
  } catch (error) {}
}

export { addAttendance, getAttendance, getAttendanceSection };
