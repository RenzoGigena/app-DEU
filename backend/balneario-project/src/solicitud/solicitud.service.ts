// src/solicitud/solicitud.service.ts

import { CreateSolicitudDto } from './solicitud.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        servicios: data.servicios as Prisma.InputJsonValue,
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

  async aprobar(id: string): Promise<any> {
    const solicitud = await this.prisma.solicitud.findUnique({ where: { id } });

    if (!solicitud) throw new Error('Solicitud no encontrada');

    const nuevoBalneario = await this.prisma.balneario.create({
      data: {
        nombre: solicitud.nombreBalneario,
        localidad: solicitud.localidad,
        descripcion: solicitud.descripcion,
        imagen: '/images/default.jpg', // o desde la solicitud si lo incluís
        imagenAlt: `Imagen de ${solicitud.nombreBalneario}`,
        latitud: 0, // deberías agregar estos datos al DTO si querés
        longitud: 0,
        contaminacionAgua: 0,
        contaminacionArena: 0,
        servicios: {
          create: (solicitud.servicios as ServicioFromJson[]).map((s) => ({
            nombreServicio: s.nombreServicio,
            tiene: s.tiene,
          })),
        },
      },
      include: { servicios: true },
    });

    // ❌ Opcional: eliminar la solicitud una vez aprobada
    await this.prisma.solicitud.delete({ where: { id } });

    return nuevoBalneario;
  }
}
