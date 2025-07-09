import { Balneario } from '../types/balneario.interface';
import { CreateBalnearioDto } from './balneario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BalnearioService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Balneario[]> {
    return this.prisma.balneario.findMany({ include: { servicios: true } });
  }

  async findOne(id: string): Promise<Balneario | null> {
    return this.prisma.balneario.findUnique({
      where: { id },
      include: { servicios: true },
    });
  }

  async create(data: CreateBalnearioDto): Promise<Balneario> {
    return this.prisma.balneario.create({
      data: {
        ...data,
        servicios: {
          create: data.servicios,
        },
      },
      include: { servicios: true },
    });
  }

  async update(
    id: string,
    data: Partial<CreateBalnearioDto>,
  ): Promise<Balneario | null> {
    // Extraer servicios si vienen en la data
    const { servicios, ...balnearioData } = data;

    // Actualizar el balneario primero
    await this.prisma.balneario.update({
      where: { id },
      data: balnearioData,
    });

    // Si se pasaron nuevos servicios, borramos los anteriores y creamos los nuevos
    if (servicios) {
      // Borrar todos los servicios del balneario
      await this.prisma.servicio.deleteMany({
        where: { balnearioId: id },
      });

      // Crear los nuevos servicios
      for (const servicio of servicios) {
        await this.prisma.servicio.create({
          data: {
            ...servicio,
            balnearioId: id,
          },
        });
      }
    }

    // Devolver el balneario actualizado con servicios incluidos
    return this.prisma.balneario.findUnique({
      where: { id },
      include: { servicios: true },
    });
  }

  async remove(id: string): Promise<Balneario> {
    return this.prisma.balneario.delete({
      where: { id },
      include: { servicios: true },
    });
  }
}
