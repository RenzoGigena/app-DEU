import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BalnearioService } from './balneario.service';
import { CreateBalnearioDto } from './balneario.dto';
import { Balneario } from '../types/balneario.interface';

@Controller('balnearios')
export class BalnearioController {
  constructor(private readonly service: BalnearioService) {}

  @Get()
  findAll(): Promise<Balneario[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Balneario> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: CreateBalnearioDto): Promise<Balneario> {
    return this.service.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<CreateBalnearioDto>,
  ): Promise<Balneario> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Balneario> {
    return this.service.remove(id);
  }
}
