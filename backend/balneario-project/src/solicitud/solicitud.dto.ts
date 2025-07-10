import {
  IsArray,
  IsBoolean,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class ServicioDto {
  @IsString()
  nombreServicio: string;

  @IsBoolean()
  tiene: boolean;
}

export class CreateSolicitudDto {
  @IsString()
  nombreBalneario: string;

  @IsString()
  localidad: string;

  @IsString()
  descripcion: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicioDto)
  servicios: ServicioDto[];

  @IsString()
  telefono: string;

  @IsUrl()
  url: string;

  @IsString()
  contribuidor: string;
}
