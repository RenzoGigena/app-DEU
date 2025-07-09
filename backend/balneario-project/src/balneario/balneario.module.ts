import { BalnearioController } from './balneario.controller';
import { BalnearioService } from './balneario.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [BalnearioService],
  controllers: [BalnearioController],
})
export class BalnearioModule {}
