"use client"

import { useState } from "react"
import Image from "next/image"

const balnearios = [
  {
    nombre: "Balneario La Costa",
    localidad: "Mar del Plata",
    descripcion: "Playas amplias, actividades y más.",
    imagen: "/images/balnearios/balneario-la-costa.jpg",
    detalle: "Servicios completos y ubicación ideal.",
  },
  {
    nombre: "Balneario El Paraíso",
    localidad: "Villa Gesell",
    descripcion: "Ideal para descansar y disfrutar en familia.",
    imagen: "/images/balnearios/balneario-el-paraiso.jpg",
    detalle: "Servicios premium y carpas.",
  },
  // Podés agregar más balnearios...
]
type Filtro = "nombre" | "localidad"

export default function BalneariosPage() {
  const [filterBy, setFilterBy] = useState<Filtro>("nombre") // ✅ Esto ahora sí es válido
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBalnearios = balnearios.filter((b) =>
    b[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Buscador */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar balneario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:max-w-sm"
        />
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value as Filtro)}
          className="border rounded px-4 py-2"
        >
          <option value="nombre">Nombre</option>
          <option value="localidad">Localidad</option>
        </select>
      </div>

      {/* Tarjetas */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {filteredBalnearios.length > 0 ? (
          filteredBalnearios.map((balneario) => (
            <div
              key={balneario.nombre}
              className="max-w-sm border rounded-md p-4 shadow-md"
            >
              <h3 className="text-xl font-bold">{balneario.nombre}</h3>
              <p className="text-gray-600">{balneario.localidad}</p>
              <p className="mt-2">{balneario.descripcion}</p>
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 underline">
                  Ver más
                </summary>
                <p className="mt-2">{balneario.detalle}</p>
                <Image
                  src={balneario.imagen}
                  alt={balneario.nombre}
                  width={300}
                  height={200}
                  className="rounded mt-2"
                />
              </details>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No se encontraron balnearios.
          </p>
        )}
      </div>
    </div>
  )
}
