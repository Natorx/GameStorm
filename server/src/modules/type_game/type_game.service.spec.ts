import { Test, TestingModule } from '@nestjs/testing';
import { TypeGameService } from './type_game.service';

describe('TypeGameService', () => {
  let service: TypeGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeGameService],
    }).compile();

    service = module.get<TypeGameService>(TypeGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
