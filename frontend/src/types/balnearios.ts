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
	telefono: string
	url: string
	servicios: Servicio[]
}

export interface ServicioDto {
	nombreServicio: string
	tiene: boolean
}

export interface CreateBalnearioDto {
	longitud: number
	latitud: number
	contaminacionArena: number
	contaminacionAgua: number
	nombre: string
	localidad: string
	descripcion: string
	imagen: string
	imagenAlt: string
	telefono: string
	url: string
	servicios: ServicioDto[]
}
