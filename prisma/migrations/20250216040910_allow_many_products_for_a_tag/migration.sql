/*
  Warnings:

  - You are about to drop the column `tag_id` on the `tb_shoes` table. All the data in the column will be lost.
  - Added the required column `shoe_id` to the `tb_custom_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_custom_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_shoes" DROP CONSTRAINT "tb_shoes_tag_id_fkey";

-- AlterTable
ALTER TABLE "tb_custom_tag" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "shoe_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_shoes" DROP COLUMN "tag_id";

-- AddForeignKey
ALTER TABLE "tb_custom_tag" ADD CONSTRAINT "tb_custom_tag_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_custom_tag" ADD CONSTRAINT "tb_custom_tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
