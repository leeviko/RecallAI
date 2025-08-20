/*
  Warnings:

  - You are about to drop the column `correctChoices` on the `flashcard` table. All the data in the column will be lost.
  - The `answer` column on the `flashcard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."flashcard" DROP COLUMN "correctChoices",
DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];
