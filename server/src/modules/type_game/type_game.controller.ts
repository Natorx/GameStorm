import { Controller } from '@nestjs/common';
import { TypeGameService } from './type_game.service';

@Controller('type-game')
export class TypeGameController {
  constructor(private readonly typeGameService: TypeGameService) {}
}
