import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSolicitudDto {
  @IsString()
  nombreBalneario: string;

  @IsString()
  localidad: string;

  @IsString()
  descripcion: string;

  @IsArray()
  @IsString({ each: true })
  servicios: string[];

  @IsString()
  telefono: string;

  @IsUrl()
  url: string;

  @IsString()
  contribuidor: string;
}
