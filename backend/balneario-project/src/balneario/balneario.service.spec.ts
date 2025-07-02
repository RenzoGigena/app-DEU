import { Test, TestingModule } from '@nestjs/testing';
import { BalnearioService } from './balneario.service';

describe('BalnearioService', () => {
  let service: BalnearioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalnearioService],
    }).compile();

    service = module.get<BalnearioService>(BalnearioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
