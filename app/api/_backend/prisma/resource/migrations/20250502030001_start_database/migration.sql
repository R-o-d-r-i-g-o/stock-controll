-- CreateTable
CREATE TABLE "tb_shoes" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "sole" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_shoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_items" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "shoe_id" INTEGER NOT NULL,

    CONSTRAINT "tb_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_expeditions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "note" TEXT,
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_expeditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_companies" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "tb_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_audits" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "tb_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_custom_tags" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "shoe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "company_id" INTEGER NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "tb_custom_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_shoes_name_key" ON "tb_shoes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_items_sku_key" ON "tb_items"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "tb_expeditions_code_key" ON "tb_expeditions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_code_key" ON "tb_users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_code_key" ON "tb_companies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_companies_name_key" ON "tb_companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_roles_name_key" ON "tb_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_custom_tags_sku_key" ON "tb_custom_tags"("sku");

-- AddForeignKey
ALTER TABLE "tb_shoes" ADD CONSTRAINT "tb_shoes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_items" ADD CONSTRAINT "tb_items_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "tb_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_expeditions" ADD CONSTRAINT "tb_expeditions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tb_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "tb_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_audits" ADD CONSTRAINT "tb_audits_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_custom_tags" ADD CONSTRAINT "tb_custom_tags_shoe_id_fkey" FOREIGN KEY ("shoe_id") REFERENCES "tb_shoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_custom_tags" ADD CONSTRAINT "tb_custom_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_custom_tags" ADD CONSTRAINT "tb_custom_tags_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "tb_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
