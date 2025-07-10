// src/types/create-balneario.dto.ts

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
	servicios: ServicioDto[]
}
