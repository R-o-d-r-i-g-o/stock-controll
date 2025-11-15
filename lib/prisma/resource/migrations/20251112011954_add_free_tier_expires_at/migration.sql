/*
  Warnings:

  - Added the required column `updated_at` to the `tb_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_companies" ADD COLUMN     "free_tier_expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tb_subscriptions" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "stripe_payment_id" TEXT,
ADD COLUMN     "stripe_session_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
