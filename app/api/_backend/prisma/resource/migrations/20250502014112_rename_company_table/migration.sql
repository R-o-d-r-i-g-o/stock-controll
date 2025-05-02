/*
  Warnings:

  - You are about to drop the `tb_company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_id` to the `tb_custom_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_audits" DROP CONSTRAINT "tb_audits_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_expeditions" DROP CONSTRAINT "tb_expeditions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_shoes" DROP CONSTRAINT "tb_shoes_company_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_users" DROP CONSTRAINT "tb_users_company_id_fkey";

-- AlterTable
ALTER TABLE "tb_custom_tag" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tb_company";

-- CreateTable
CREATE TABLE "tb_companies" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_code_key" ON "tb_companies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_name_key" ON "tb_companies"("name");

-- AddForeignKey
ALTER TABLE "tb_shoes" ADD CONSTRAINT "tb_shoes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_custom_tag" ADD CONSTRAINT "tb_custom_tag_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
