/*
  Warnings:

  - You are about to drop the `tb_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_item_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_user_id_fkey";

-- DropTable
DROP TABLE "tb_orders";

-- CreateTable
CREATE TABLE "tb_expeditions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tb_expeditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_expeditions_code_key" ON "tb_expeditions"("code");

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "tb_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
