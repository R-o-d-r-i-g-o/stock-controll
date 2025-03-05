-- AlterTable
ALTER TABLE "tb_shoes" ADD COLUMN     "tag_id" INTEGER;

-- CreateTable
CREATE TABLE "tb_custom_tag" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "tb_custom_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_custom_tag_sku_key" ON "tb_custom_tag"("sku");

-- AddForeignKey
ALTER TABLE "tb_shoes" ADD CONSTRAINT "tb_shoes_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tb_custom_tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
