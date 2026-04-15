import { Module } from '@nestjs/common';
import { TypeGameService } from './type_game.service';
import { TypeGameController } from './type_game.controller';

@Module({
  controllers: [TypeGameController],
  providers: [TypeGameService],
})
export class TypeGameModule {}
