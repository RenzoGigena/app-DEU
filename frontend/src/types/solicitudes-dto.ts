// src/types/create-solicitud.dto.ts

import { Servicio } from "./solicitudes"

export interface CreateSolicitudDto {
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: Servicio[] // 👈 igual que en la interfaz
	telefono: string
	url: string
	contribuidor: string
}
