/*
  Warnings:

  - You are about to drop the column `progress` on the `deck_metrics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."deck_metrics" DROP COLUMN "progress";

-- CreateTable
CREATE TABLE "public"."study_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."study_session" ADD CONSTRAINT "study_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."study_session" ADD CONSTRAINT "study_session_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
