// src/solicitud/solicitud.service.ts

import { CreateSolicitudDto } from './solicitud.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Solicitud } from '@prisma/client';

@Injectable()
export class SolicitudService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSolicitudDto): Promise<Solicitud> {
    return this.prisma.solicitud.create({ data });
  }

  findAll(): Promise<Solicitud[]> {
    return this.prisma.solicitud.findMany();
  }

  findOne(id: string): Promise<Solicitud | null> {
    return this.prisma.solicitud.findUnique({ where: { id } });
  }

  remove(id: string): Promise<Solicitud> {
    return this.prisma.solicitud.delete({ where: { id } });
  }
}
