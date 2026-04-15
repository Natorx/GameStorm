import { Test, TestingModule } from '@nestjs/testing';
import { TypeGameController } from './type_game.controller';
import { TypeGameService } from './type_game.service';

describe('TypeGameController', () => {
  let controller: TypeGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeGameController],
      providers: [TypeGameService],
    }).compile();

    controller = module.get<TypeGameController>(TypeGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
