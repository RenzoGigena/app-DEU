import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalnearioModule } from './balneario/balneario.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SolicitudModule } from './solicitud/solicitud.module';

@Module({
  imports: [BalnearioModule, SolicitudModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
