import { BalnearioService } from './balneario.service';
import { CreateBalnearioDto } from './balneario.dto';
import { Balneario } from '../types/balneario.interface';
export declare class BalnearioController {
    private readonly service;
    constructor(service: BalnearioService);
    findAll(): Promise<Balneario[]>;
    findOne(id: string): Promise<Balneario>;
    create(body: CreateBalnearioDto): Promise<Balneario>;
    update(id: string, body: Partial<CreateBalnearioDto>): Promise<Balneario>;
    remove(id: string): Promise<Balneario>;
}
