import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './solicitud.dto';
import { Solicitud } from '../types/solicitud.interface';

@Controller('solicitudes')
export class SolicitudController {
  constructor(private readonly service: SolicitudService) {}

  @Post()
  async create(@Body() dto: CreateSolicitudDto): Promise<Solicitud> {
    const solicitud = await this.service.create(dto);
    return this.ensureValidSolicitud(solicitud);
  }

  @Get()
  async findAll(): Promise<Solicitud[]> {
    const solicitudes = await this.service.findAll();
    return solicitudes.map(this.ensureValidSolicitud);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Solicitud> {
    const solicitud = await this.service.findOne(id);
    if (!solicitud) throw new NotFoundException('Solicitud no encontrada');
    return this.ensureValidSolicitud(solicitud);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Solicitud> {
    const solicitud = await this.service.remove(id);
    return this.ensureValidSolicitud(solicitud);
  }

  @Post(':id/aprobar')
  async aprobar(@Param('id') id: string): Promise<Solicitud> {
    const solicitud = await this.service.aprobar(id);
    return this.ensureValidSolicitud(solicitud);
  }

  private ensureValidSolicitud(solicitud: any): Solicitud {
    if (!Array.isArray(solicitud.servicios)) {
      throw new Error('Campo servicios inválido en la solicitud');
    }
    return {
      ...solicitud,
      servicios: solicitud.servicios as any[], // si tenés definido el tipo `Servicio` podés ponerlo explícito
    };
  }
}
