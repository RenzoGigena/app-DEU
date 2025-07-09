import { BalnearioService } from './balneario.service';
import { CreateBalnearioDto } from './balneario.dto';
import { Balneario } from '../types/balneario.interface';
export declare class BalnearioController {
    private readonly service;
    constructor(service: BalnearioService);
    findAll(): Promise<Balneario[]>;
    findOne(id: string): Promise<Balneario | null>;
    create(body: CreateBalnearioDto): Promise<Balneario>;
    update(id: string, body: Partial<CreateBalnearioDto>): Promise<Balneario | null>;
    remove(id: string): Promise<Balneario>;
}
