import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './solicitud.dto';
import { Solicitud } from '../types/solicitud.interface';

@Controller('solicitudes')
export class SolicitudController {
  constructor(private readonly service: SolicitudService) {}

  @Post()
  create(@Body() dto: CreateSolicitudDto): Promise<Solicitud> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Solicitud[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Solicitud> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Solicitud> {
    return this.service.remove(id);
  }
}
