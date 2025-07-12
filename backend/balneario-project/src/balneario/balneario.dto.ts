import {
  IsArray,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class ServicioDto {
  @IsString()
  @IsNotEmpty()
  nombreServicio: string;

  @IsBoolean()
  tiene: boolean;
}

export class CreateBalnearioDto {
  @IsLongitude()
  longitud: number;

  @IsLatitude()
  latitud: number;

  @IsNumber()
  contaminacionArena: number;

  @IsNumber()
  contaminacionAgua: number;

  @IsString()
  nombre: string;

  @IsString()
  localidad: string;

  @IsString()
  descripcion: string;

  @IsString()
  imagen: string;

  @IsString()
  imagenAlt: string;

  @IsString()
  telefono: string;

  @IsUrl()
  url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicioDto)
  servicios: ServicioDto[];
}
