import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async playerPost(@Body() newPlayer: PlayerDto) {
    this.playerService.createPlayer(newPlayer);
  }

  @Get()
  async playerGet(): Promise<Player[]> {
    return this.playerService.getPlayers();
  }
}
