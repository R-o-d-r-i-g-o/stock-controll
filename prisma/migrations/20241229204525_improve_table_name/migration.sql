/*
  Warnings:

  - You are about to drop the column `shoe_id` on the `tb_orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `tb_shoes` table. All the data in the column will be lost.
  - You are about to drop the column `hash_code` on the `tb_shoes` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tb_shoes` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `tb_shoes` table. All the data in the column will be lost.
  - You are about to drop the `tb_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_history` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `tb_shoes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_id` to the `tb_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sole` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_history" DROP CONSTRAINT "tb_history_shoe_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_history" DROP CONSTRAINT "tb_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_shoe_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_shoes" DROP CONSTRAINT "tb_shoes_category_id_fkey";

-- DropIndex
DROP INDEX "tb_shoes_hash_code_key";

-- AlterTable
ALTER TABLE "tb_orders" DROP COLUMN "shoe_id",
ADD COLUMN     "item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_shoes" DROP COLUMN "category_id",
DROP COLUMN "hash_code",
DROP COLUMN "price",
DROP COLUMN "size",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sole" TEXT NOT NULL;

-- DropTable
DROP TABLE "tb_categories";

-- DropTable
DROP TABLE "tb_history";

-- CreateTable
CREATE TABLE "tb_items" (
    "id" SERIAL NOT NULL,
    "hash_code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "shoe_id" INTEGER NOT NULL,

    CONSTRAINT "tb_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_audits" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER,

    CONSTRAINT "tb_audits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_items_hash_code_key" ON "tb_items"("hash_code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_shoes_name_key" ON "tb_shoes"("name");

-- AddForeignKey
ALTER TABLE "tb_items" ADD CONSTRAINT "tb_items_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_orders" ADD CONSTRAINT "tb_orders_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "tb_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "tb_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
