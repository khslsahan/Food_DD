-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "is_balanced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_gourmet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_weight_loss" BOOLEAN NOT NULL DEFAULT false;
