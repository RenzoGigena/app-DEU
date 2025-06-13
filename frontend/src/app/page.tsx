"use client"

import { AlertTriangle } from "lucide-react"

export default function HomePage() {
	return (
		<main className="flex-1 mx-auto w-full max-w-3xl px-3 py-12 space-y-8 text-base leading-relaxed">
			<section className="items-center text-center">
				<h2 className="text-3xl font-bold text-primary mb-4">Bienvenido</h2>
				<p className="text-muted-foreground">
					Este sitio web tiene como objetivo principal brindar información actualizada sobre
					la contaminacion en balnearios y zonas costeras de la rivera sur del Rio
					de La Plata, en la provincia de Buenos Aires, Argentina.
					Tambien puede consultar informacion sobre servicios con los que cuenta cada balneario e
					incluso ver comentarios de otros usuarios.
				</p>
				<p className="text-muted-foreground mt-2">
					Forma parte de un proyecto desarrollado en la cátedra de Diseño de
					Experiencia de Usuario de la Facultad de Informática (UNLP) en el año 2025.
				</p>
			</section>

			<section>
				<h3 className="text-2xl font-semibold text-primary mt-8 mb-3">
					Evitá enfermarte
				</h3>
				<p className="text-muted-foreground">
					En muchas zonas costeras, el agua y la arena pueden estar contaminadas con bacterias como <strong>Escherichia coli</strong> y <strong>Enterococos</strong>, 
					que provienen principalmente de desechos cloacales. Aunque suelen asociarse con el agua, estudios demuestran que estas bacterias pueden <strong>sobrevivir durante más tiempo en la arena</strong>, representando un riesgo incluso fuera del mar. 
					<br className="hidden sm:inline" />
					Consulta en este sitio web sobre el lugar que quieres visitar para informarte sobre su estado!
				</p>
			</section>

			<section className="bg-red-100 border border-red-300 rounded-lg px-6 py-4 flex items-start gap-3">
				<AlertTriangle className="text-red-600 mt-1" />
				<div>
					<p className="text-red-700 font-medium">Aviso importante</p>
					<p className="text-sm text-red-600">
						Algunos balnearios pueden estar cerrados temporalmente por presencia
						de bacterias nocivas. Consultá el estado actual antes de ingresar al
						agua.
					</p>
				</div>
			</section>
		</main>
	)
}
