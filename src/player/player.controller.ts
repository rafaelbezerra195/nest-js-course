import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async playerPost(@Body() newPlayer: PlayerDto): Promise<Player> {
    return await this.playerService.createPlayer(newPlayer);
  }

  @Put('/:_id')
  async playerPut(
    @Param('_id', PlayerParamValitadionPipe) _id: string,
    @Body() newPlayer: PlayerDto,
  ): Promise<void> {
    await this.playerService.updatePlayer(_id, newPlayer);
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

  @Delete('/:_id')
  async playerDelete(
    @Param('_id', PlayerParamValitadionPipe) _id: string,
  ): Promise<void> {
    await this.playerService.delete(_id);
  }
}
