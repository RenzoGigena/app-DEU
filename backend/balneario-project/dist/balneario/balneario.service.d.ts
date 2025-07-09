import { Balneario } from '../types/balneario.interface';
import { CreateBalnearioDto } from './balneario.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class BalnearioService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Balneario[]>;
    findOne(id: string): Promise<Balneario | null>;
    create(data: CreateBalnearioDto): Promise<Balneario>;
    update(id: string, data: Partial<CreateBalnearioDto>): Promise<Balneario | null>;
    remove(id: string): Promise<Balneario>;
}
