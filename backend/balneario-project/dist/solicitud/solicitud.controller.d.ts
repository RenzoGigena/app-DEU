import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './solicitud.dto';
import { Solicitud } from '../types/solicitud.interface';
export declare class SolicitudController {
    private readonly service;
    constructor(service: SolicitudService);
    create(dto: CreateSolicitudDto): Promise<Solicitud>;
    findAll(): Promise<Solicitud[]>;
    findOne(id: string): Promise<Solicitud | null>;
    remove(id: string): Promise<Solicitud>;
}
