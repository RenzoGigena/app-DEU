-- CreateTable
CREATE TABLE "Servicio" (
    "id" TEXT NOT NULL,
    "nombreServicio" TEXT NOT NULL,
    "tiene" BOOLEAN NOT NULL,
    "balnearioId" TEXT NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balneario" (
    "id" TEXT NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "contaminacionArena" DOUBLE PRECISION NOT NULL,
    "contaminacionAgua" DOUBLE PRECISION NOT NULL,
    "nombre" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "imagenAlt" TEXT NOT NULL,

    CONSTRAINT "Balneario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL,
    "nombreBalneario" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "servicios" TEXT[],
    "telefono" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "contribuidor" TEXT NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_balnearioId_fkey" FOREIGN KEY ("balnearioId") REFERENCES "Balneario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
