/*
  Warnings:

  - You are about to drop the column `hash_code` on the `tb_items` table. All the data in the column will be lost.
  - You are about to drop the column `hash_code` on the `tb_orders` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `tb_shoes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `tb_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `tb_orders` will be added. If there are existing duplicate values, this will fail.
  - The required column `sku` was added to the `tb_items` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `code` was added to the `tb_orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `note` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tb_items_hash_code_key";

-- DropIndex
DROP INDEX "tb_orders_hash_code_key";

-- AlterTable
ALTER TABLE "tb_items" DROP COLUMN "hash_code",
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_orders" DROP COLUMN "hash_code",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_shoes" DROP COLUMN "description",
ADD COLUMN     "note" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_items_sku_key" ON "tb_items"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "tb_orders_code_key" ON "tb_orders"("code");
