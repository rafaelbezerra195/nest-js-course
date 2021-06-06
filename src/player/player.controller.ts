import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayerParamValitadionPipe } from './pipes/player-param-validation.pipe';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async playerPost(@Body() newPlayer: PlayerDto): Promise<void> {
    await this.playerService.createPlayer(newPlayer);
  }

  @Get('/:_id')
  async playerGet(
    @Param('_id', PlayerParamValitadionPipe) _id: string,
  ): Promise<Player> {
    return await this.playerService.getPlayer(_id);
  }

  @Get()
  async playerGetAll(): Promise<Player[]> {
    return await this.playerService.getPlayers();
  }

  @Delete()
  async playerDelete(
    @Query('email', PlayerParamValitadionPipe) email: string,
  ): Promise<void> {
    await this.playerService.delete(email);
  }
}
