-- DropForeignKey
ALTER TABLE "tb_history" DROP CONSTRAINT "tb_history_shoe_id_fkey";

-- AlterTable
ALTER TABLE "tb_history" ALTER COLUMN "shoe_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_history" ADD CONSTRAINT "tb_history_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
