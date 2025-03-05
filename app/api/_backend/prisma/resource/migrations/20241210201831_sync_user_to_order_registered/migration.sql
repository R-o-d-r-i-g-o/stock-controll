/*
  Warnings:

  - The primary key for the `tb_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tb_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_user_id_fkey";

-- AlterTable
ALTER TABLE "tb_orders" ADD COLUMN     "categoryId" INTEGER;

-- AlterTable
ALTER TABLE "tb_users" DROP CONSTRAINT "tb_users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "tb_orders" ADD CONSTRAINT "tb_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_orders" ADD CONSTRAINT "tb_orders_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tb_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
