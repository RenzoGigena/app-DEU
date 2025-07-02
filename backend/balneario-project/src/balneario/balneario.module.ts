import { Module } from '@nestjs/common';
import { BalnearioService } from './balneario.service';
import { BalnearioController } from './balneario.controller';

@Module({
  providers: [BalnearioService],
  controllers: [BalnearioController]
})
export class BalnearioModule {}
