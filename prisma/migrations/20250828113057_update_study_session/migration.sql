-- DropForeignKey
ALTER TABLE "public"."study_session" DROP CONSTRAINT "study_session_deckId_fkey";

-- AlterTable
ALTER TABLE "public"."study_session" ALTER COLUMN "deckId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."study_session" ADD CONSTRAINT "study_session_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
