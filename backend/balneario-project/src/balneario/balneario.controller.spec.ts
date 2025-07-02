import { Test, TestingModule } from '@nestjs/testing';
import { BalnearioController } from './balneario.controller';

describe('BalnearioController', () => {
  let controller: BalnearioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalnearioController],
    }).compile();

    controller = module.get<BalnearioController>(BalnearioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
