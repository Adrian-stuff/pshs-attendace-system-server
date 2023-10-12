/*
  Warnings:

  - You are about to drop the column `time` on the `attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "time",
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP;
