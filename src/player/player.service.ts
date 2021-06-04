import { Injectable, Logger } from '@nestjs/common';
import { PlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger('PlayerService');
  private playerList: Player[] = [];

  createPlayer(newPlayer: PlayerDto) {
    if (this.playerList.some((player) => player.email === newPlayer.email)) {
      this.update(newPlayer);
      return;
    }

    this.create(newPlayer);
  }

  private create(newPlayer: PlayerDto) {
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

  private update(player: PlayerDto) {
    this.playerList = this.playerList.map((currentPlayer) => {
      if (currentPlayer.email === player.email) {
        currentPlayer.nome = player.nome;
      }

      return currentPlayer;
    });
  }

  getPlayers(): Player[] {
    return this.playerList;
  }
}
