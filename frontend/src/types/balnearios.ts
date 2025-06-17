export type Servicio = {
	nombreServicio: string
	tiene: boolean
}

export type Balneario = {
	id: string
	nombre: string
	localidad: string
	descripcion: string
	imagen: string
	imagenAlt: string
	detalle: string
	servicios: Servicio[]
}

export type Solicitud = {
	id: string
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: string[]
	telefono: string
	url: string
	contribuidor: string
}
