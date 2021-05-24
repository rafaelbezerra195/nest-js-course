import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async playerPost(@Body() newPlayer: CreatePlayerDto) {
    await this.playerService.createPlayer(newPlayer);
  }
}
