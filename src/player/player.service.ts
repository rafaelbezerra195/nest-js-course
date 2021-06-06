import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  public async createPlayer(newPlayer: PlayerDto): Promise<void> {
    const player = await this.playerModel
      .findOne({ email: newPlayer.email })
      .exec();
    if (!_.isNil(player))
      throw new BadRequestException('Player already exists.');

    const createdPlayer = new this.playerModel(newPlayer);
    await createdPlayer.save();
  }

  public async updatePlayer(email: string, player: PlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ email }, { $set: player })
      .exec();
  }

  public async getPlayer(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (_.isNil(player)) throw new NotFoundException('Player not found.');

    return player;
  }

  public async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  public async delete(email: string): Promise<any> {
    await this.playerModel.deleteOne({ email });
  }
}
