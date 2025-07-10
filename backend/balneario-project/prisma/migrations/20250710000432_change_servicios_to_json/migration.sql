/*
  Warnings:

  - Changed the type of `servicios` on the `Solicitud` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Solicitud" DROP COLUMN "servicios",
ADD COLUMN     "servicios" JSONB NOT NULL;
