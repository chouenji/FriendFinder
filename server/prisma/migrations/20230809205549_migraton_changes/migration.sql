/*
  Warnings:

  - Added the required column `matchedId` to the `chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "matchedId" INTEGER NOT NULL;
