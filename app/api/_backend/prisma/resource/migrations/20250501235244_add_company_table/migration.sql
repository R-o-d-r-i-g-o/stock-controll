/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `tb_audits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `tb_expeditions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `tb_shoes` table without a default value. This is not possible if the table is not empty.
  - The required column `code` was added to the `tb_users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `company_id` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_audits" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_expeditions" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_shoes" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tb_company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_company_name_key" ON "tb_company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_code_key" ON "tb_users"("code");

-- AddForeignKey
ALTER TABLE "tb_shoes" ADD CONSTRAINT "tb_shoes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
