import { Balneario, Prisma } from '@prisma/client';

import { CreateSolicitudDto } from './solicitud.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Solicitud } from '@prisma/client';

type ServicioFromJson = { nombreServicio: string; tiene: boolean };

@Injectable()
export class SolicitudService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSolicitudDto): Promise<Solicitud> {
    return this.prisma.solicitud.create({
      data: {
        ...data,
        servicios: data.servicios as unknown as Prisma.JsonArray,
      },
    });
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

  async aprobar(id: string): Promise<Balneario> {
    const solicitud = await this.prisma.solicitud.findUnique({ where: { id } });

    if (!solicitud) throw new Error('Solicitud no encontrada');

    const nuevoBalneario = await this.prisma.balneario.create({
      data: {
        nombre: solicitud.nombreBalneario,
        localidad: solicitud.localidad,
        descripcion: solicitud.descripcion,
        imagen: solicitud.imagen,
        imagenAlt: solicitud.imagenAlt,
        latitud: solicitud.latitud,
        longitud: solicitud.longitud,
        contaminacionAgua: solicitud.contaminacionAgua,
        contaminacionArena: solicitud.contaminacionArena,
        telefono: solicitud.telefono,
        url: solicitud.url,
        servicios: {
          create: (solicitud.servicios as ServicioFromJson[]).map((s) => ({
            nombreServicio: s.nombreServicio,
            tiene: s.tiene,
          })),
        },
      },
      include: { servicios: true },
    });

    await this.prisma.solicitud.delete({ where: { id } });

    return nuevoBalneario;
  }
}
