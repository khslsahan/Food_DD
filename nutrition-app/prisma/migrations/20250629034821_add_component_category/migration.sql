-- AlterTable
ALTER TABLE "components" ADD COLUMN     "category_id" INTEGER;

-- CreateTable
CREATE TABLE "component_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "component_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "component_category_name_key" ON "component_category"("name");

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "component_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
