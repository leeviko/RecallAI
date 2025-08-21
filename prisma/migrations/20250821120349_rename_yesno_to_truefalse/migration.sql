/*
  Warnings:

  - The values [YA] on the enum `FlashcardType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FlashcardType_new" AS ENUM ('QA', 'MULTICHOICE', 'TRUEFALSE');
ALTER TABLE "public"."flashcard" ALTER COLUMN "type" TYPE "public"."FlashcardType_new" USING ("type"::text::"public"."FlashcardType_new");
ALTER TYPE "public"."FlashcardType" RENAME TO "FlashcardType_old";
ALTER TYPE "public"."FlashcardType_new" RENAME TO "FlashcardType";
DROP TYPE "public"."FlashcardType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."flashcard" ALTER COLUMN "answer" SET NOT NULL,
ALTER COLUMN "answer" SET DATA TYPE TEXT;
