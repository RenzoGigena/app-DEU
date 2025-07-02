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

  async findOne(id: string): Promise<Balneario> {
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
  ): Promise<Balneario> {
    return this.prisma.balneario.update({
      where: { id },
      data,
      include: { servicios: true },
    });
  }

  async remove(id: string): Promise<Balneario> {
    return this.prisma.balneario.delete({ where: { id } });
  }
}
