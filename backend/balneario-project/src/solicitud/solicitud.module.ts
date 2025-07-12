import { Module } from '@nestjs/common';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';

@Module({
  providers: [SolicitudService],
  controllers: [SolicitudController],
})
export class SolicitudModule {}
