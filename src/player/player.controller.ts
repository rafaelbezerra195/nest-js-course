import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayerController {
  @Post()
  async playerPost(@Body() newPlayer: CreatePlayerDto) {
    const { email } = newPlayer;

    return JSON.stringify({
      nome: email,
    });
  }
}
