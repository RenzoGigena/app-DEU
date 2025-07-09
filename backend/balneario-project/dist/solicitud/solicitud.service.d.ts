import { CreateSolicitudDto } from './solicitud.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Solicitud } from '@prisma/client';
export declare class SolicitudService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSolicitudDto): Promise<Solicitud>;
    findAll(): Promise<Solicitud[]>;
    findOne(id: string): Promise<Solicitud | null>;
    remove(id: string): Promise<Solicitud>;
}
