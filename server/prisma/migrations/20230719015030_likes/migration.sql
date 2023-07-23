-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
