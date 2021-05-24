import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger('PlayerService');
  private playerList: Player[] = [];

  async createPlayer(newPlayer: CreatePlayerDto): Promise<void> {    
    this.create(newPlayer);
  }

  private create(newPlayer: CreatePlayerDto) {
    const { nome, email, phoneNumber } = newPlayer;

    const player: Player = {
      _id: uuidv4(),
      nome,
      email,
      phoneNumber,
      ranking: `A`,
      rankingPosition: 0,
      urlPhoto: `www.google.com.br/foto123.jpg`,
    };

    this.logger.log(player);
    this.playerList.push(player);
  }
}
