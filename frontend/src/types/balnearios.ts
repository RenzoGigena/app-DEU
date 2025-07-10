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
export interface Servicio {
	id: string
	nombreServicio: string
	tiene: boolean
	balnearioId: string
}

export interface Balneario {
	id: string
	longitud: number
	latitud: number
	contaminacionArena: number
	contaminacionAgua: number
	nombre: string
	localidad: string
	descripcion: string
	imagen: string
	imagenAlt: string
	servicios: Servicio[]
}
