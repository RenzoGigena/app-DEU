import Image from "next/image"
import { notFound } from "next/navigation"

type Servicio = {
  nombreServicio: string
  tiene: boolean
}

type Balneario = {
  id: string
  nombre: string
  localidad: string
  descripcion: string
  imagen: string
  imagenAlt: string
  detalle: string
  servicios: Servicio[]
}

export default async function BalnearioDetail({ params }: any) {
  const { id } = params

  const data = await import("@/database/balnearios.json")
  const balnearios: Balneario[] = data.default

  const balneario = balnearios.find((b) => b.id === id)

  if (!balneario) return notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">{balneario.nombre}</h1>
      <p className="text-gray-600 text-lg">{balneario.localidad}</p>
      <Image
        src={balneario.imagen}
        alt={balneario.imagenAlt}
        width={600}
        height={400}
        className="rounded-md"
      />
      <p>{balneario.detalle}</p>

      <h2 className="text-2xl font-semibold mt-6">Servicios</h2>
      <ul className="space-y-2">
        {balneario.servicios.map((servicio, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={servicio.tiene}
              readOnly
              className="accent-blue-500"
            />
            <label>{servicio.nombreServicio}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}
