import { useEffect, useState } from "react"

import { Balneario } from "@/types/balnearios"
import DaltonicImage from "@/components/DaltonicImage"
import Link from "next/link"

interface Props {
	balneario: Balneario
}

export function BalnearioCard({ balneario }: Props) {
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 640)
		}

		checkScreenSize()
		window.addEventListener("resize", checkScreenSize)

		return () => window.removeEventListener("resize", checkScreenSize)
	}, [])

	return (
		<article
			className="w-full rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow flex overflow-hidden"
			role="listitem"
			aria-labelledby={`balneario-${balneario.id}-nombre`}
		>
			{/* Imagen (solo en pantallas grandes) */}
			{!isSmallScreen && balneario.imagen && (
				<DaltonicImage
					src={balneario.imagen}
					alt={balneario.imagenAlt || `Imagen de ${balneario.nombre}`}
					width={180}
					height={140}
					className="w-48 h-36 object-cover flex-shrink-0"
				/>
			)}

			{/* Contenido */}
			<div className="flex flex-col justify-center px-4 py-3 flex-grow">
				<h3
					id={`balneario-${balneario.id}-nombre`}
					className="text-xl font-semibold text-primary"
				>
					{balneario.nombre}
				</h3>
				<p className="text-sm text-muted-foreground">{balneario.localidad}</p>
				<p className="text-sm text-gray-700 line-clamp-2">
					{balneario.descripcion}
				</p>
			</div>

			{/* Botón lateral */}
			<Link
				href={`/balnearios/${balneario.id}`}
				className={`bg-primary hover:bg-accent text-white text-sm flex-shrink-0 font-medium flex items-center justify-center transition-all duration-200
        ${isSmallScreen ? "w-16 px-3 py-2" : "w-24 px-6 py-2"}
        focus-visible:bg-accent focus-visible:outline-none focus-visible:text-white
    `}
				aria-label={`Ver más sobre ${balneario.nombre}`}
			>
				Ver más
			</Link>
		</article>
	)
}
