import { Servicio } from './servicio.interface';

export interface Balneario {
  id: string;
  longitud: number;
  latitud: number;
  contaminacionArena: number;
  contaminacionAgua: number;
  nombre: string;
  localidad: string;
  descripcion: string;
  imagen: string;
  imagenAlt: string;
  telefono: string;
  url: string;
  servicios: Servicio[];
}
