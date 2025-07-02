declare class ServicioDto {
    nombreServicio: string;
    tiene: boolean;
}
export declare class CreateBalnearioDto {
    longitud: number;
    latitud: number;
    contaminacionArena: number;
    contaminacionAgua: number;
    nombre: string;
    localidad: string;
    descripcion: string;
    imagen: string;
    imagenAlt: string;
    servicios: ServicioDto[];
}
export {};
