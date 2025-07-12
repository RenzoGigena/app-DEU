/*
  Warnings:

  - Added the required column `telefono` to the `Balneario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Balneario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaminacionAgua` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaminacionArena` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenAlt` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitud` to the `Solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balneario" ADD COLUMN     "telefono" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "contaminacionAgua" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contaminacionArena" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "imagenAlt" TEXT NOT NULL,
ADD COLUMN     "latitud" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitud" DOUBLE PRECISION NOT NULL;
