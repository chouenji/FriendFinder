-- DropForeignKey
ALTER TABLE "like_users" DROP CONSTRAINT "like_users_likedId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "matchedId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "like_users" ADD CONSTRAINT "like_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
