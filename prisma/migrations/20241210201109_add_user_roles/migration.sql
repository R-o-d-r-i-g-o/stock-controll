/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "role";

-- CreateTable
CREATE TABLE "tb_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "tb_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_roles_name_key" ON "tb_roles"("name");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tb_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
