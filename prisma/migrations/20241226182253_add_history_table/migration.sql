-- CreateTable
CREATE TABLE "tb_history" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "shoe_id" INTEGER NOT NULL,

    CONSTRAINT "tb_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_history" ADD CONSTRAINT "tb_history_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_history" ADD CONSTRAINT "tb_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
