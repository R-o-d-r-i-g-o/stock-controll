-- AlterTable
ALTER TABLE "tb_companies" ADD COLUMN     "subscription_expires_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "tb_subscriptions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_subscriptions_code_key" ON "tb_subscriptions"("code");

-- AddForeignKey
ALTER TABLE "tb_subscriptions" ADD CONSTRAINT "tb_subscriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
