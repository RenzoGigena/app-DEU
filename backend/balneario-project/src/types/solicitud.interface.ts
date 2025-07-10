export interface Servicio {
  nombreServicio: string;
  tiene: boolean;
}

export interface Solicitud {
  id: string;
  nombreBalneario: string;
  localidad: string;
  descripcion: string;
  servicios: Servicio[];
  telefono: string;
  url: string;
  contribuidor: string;
}
