/*
  Warnings:

  - You are about to drop the `deck_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."deck_status" DROP CONSTRAINT "deck_status_deckId_fkey";

-- DropForeignKey
ALTER TABLE "public"."deck_status" DROP CONSTRAINT "deck_status_userId_fkey";

-- DropTable
DROP TABLE "public"."deck_status";

-- CreateTable
CREATE TABLE "public"."deck_metrics" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastVisited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deck_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deck_metrics_deckId_userId_key" ON "public"."deck_metrics"("deckId", "userId");

-- AddForeignKey
ALTER TABLE "public"."deck_metrics" ADD CONSTRAINT "deck_metrics_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."deck_metrics" ADD CONSTRAINT "deck_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
