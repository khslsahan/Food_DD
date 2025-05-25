-- CreateTable
CREATE TABLE "components" (
    "component_id" SERIAL NOT NULL,
    "meal_id" INTEGER,
    "component_name" VARCHAR(100) NOT NULL,
    "before_cook_weight_g" DECIMAL(10,2),
    "after_cook_weight_g" DECIMAL(10,2),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "components_pkey" PRIMARY KEY ("component_id")
);

-- CreateTable
CREATE TABLE "component_portions" (
    "portion_id" SERIAL NOT NULL,
    "component_id" INTEGER NOT NULL,
    "label" VARCHAR(20) NOT NULL,
    "total_weight_g" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "component_portions_pkey" PRIMARY KEY ("portion_id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "ingredient_id" SERIAL NOT NULL,
    "ingredient_name" VARCHAR(100) NOT NULL,
    "default_unit" VARCHAR(20) NOT NULL,
    "calories_per_100g" DECIMAL(10,2) NOT NULL,
    "fat_g" DECIMAL(10,2) NOT NULL,
    "protein_g" DECIMAL(10,2) NOT NULL,
    "carbohydrates_g" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "meals" (
    "meal_id" SERIAL NOT NULL,
    "meal_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("meal_id")
);

-- CreateTable
CREATE TABLE "portion_options" (
    "portion_id" SERIAL NOT NULL,
    "meal_id" INTEGER,
    "size_name" VARCHAR(20) NOT NULL,
    "multiplier" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portion_options_pkey" PRIMARY KEY ("portion_id")
);

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "component_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "raw_quantity_g" DECIMAL(10,2) NOT NULL,
    "cooked_quantity_g" DECIMAL(10,2),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("component_id","ingredient_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "component_portions_component_id_label_key" ON "component_portions"("component_id", "label");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_ingredient_name_key" ON "ingredients"("ingredient_name");

-- CreateIndex
CREATE UNIQUE INDEX "meals_meal_name_key" ON "meals"("meal_name");

-- CreateIndex
CREATE UNIQUE INDEX "portion_options_meal_id_size_name_key" ON "portion_options"("meal_id", "size_name");

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("meal_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "component_portions" ADD CONSTRAINT "component_portions_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("component_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "portion_options" ADD CONSTRAINT "portion_options_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("meal_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("component_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("ingredient_id") ON DELETE CASCADE ON UPDATE NO ACTION;
