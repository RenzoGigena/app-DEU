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
	servicios: Servicio[] // 👈 ahora es un array de objetos
	telefono: string
	url: string
	contribuidor: string
}

export interface CreateSolicitudDto {
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: Servicio[] // 👈 igual que en la interfaz
	telefono: string
	url: string
	contribuidor: string
}
