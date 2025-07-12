// src/types/servicio.interface.ts

export interface Servicio {
	nombreServicio: string
	tiene: boolean
}
export interface Solicitud {
	id: string
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: Servicio[]
	telefono: string
	url: string
	contribuidor: string
	longitud: number
	latitud: number
	contaminacionArena: number
	contaminacionAgua: number
	imagen: string
	imagenAlt: string
}

export interface CreateSolicitudDto {
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: Servicio[]
	telefono: string
	url: string
	contribuidor: string
	longitud: number
	latitud: number
	contaminacionArena: number
	contaminacionAgua: number
	imagen: string
	imagenAlt: string
}
