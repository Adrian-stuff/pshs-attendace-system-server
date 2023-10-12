-- CreateEnum
CREATE TYPE "status" AS ENUM ('LATE', 'ONTIME');

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "student_id" BIGINT NOT NULL,
    "attendance_status" "status",
    "date" DATE DEFAULT CURRENT_TIMESTAMP,
    "time" TIME(3) DEFAULT LOCALTIME,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradelevels" (
    "grade_level" INTEGER NOT NULL,
    "grade_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "gradelevels_pkey" PRIMARY KEY ("grade_level")
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" VARCHAR(2) NOT NULL,
    "adviser" VARCHAR(255),
    "room" INTEGER,
    "grade_level" INTEGER NOT NULL,
    "section_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "students" (
    "lrn" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "grade_level" INTEGER,
    "sex" VARCHAR(6),
    "section_id" VARCHAR(2),
    "guardian_name" VARCHAR(255),
    "contact_guardian" BIGINT,
    "address" TEXT,

    CONSTRAINT "students_pkey" PRIMARY KEY ("lrn")
);

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("lrn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_grade_level_fkey" FOREIGN KEY ("grade_level") REFERENCES "gradelevels"("grade_level") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_grade_level_fkey" FOREIGN KEY ("grade_level") REFERENCES "gradelevels"("grade_level") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("section_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
