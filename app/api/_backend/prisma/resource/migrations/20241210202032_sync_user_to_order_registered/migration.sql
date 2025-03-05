/*
  Warnings:

  - You are about to drop the column `categoryId` on the `tb_orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_orders" DROP CONSTRAINT "tb_orders_categoryId_fkey";

-- AlterTable
ALTER TABLE "tb_orders" DROP COLUMN "categoryId";
