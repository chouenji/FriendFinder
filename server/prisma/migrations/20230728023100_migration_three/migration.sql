/*
  Warnings:

  - You are about to drop the column `message` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "message",
ADD COLUMN     "messages" TEXT[];
