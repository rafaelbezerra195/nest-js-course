import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async createPlayer(player: PlayerDto) {
    const foundPlayer = await this.playerModel
      .findOne({ email: player.email })
      .exec();

    if (_.isNil(foundPlayer)) {
      await this.create(player);
      return;
    }

    await this.update(player);
  }

  private async create(newPlayer: PlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(newPlayer);
    return await createdPlayer.save();
  }

  private async update(player: PlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ email: player.email }, { $set: player })
      .exec();
  }

  public async getPlayers(email?: string): Promise<Player[]> {
    if (_.isNil(email)) return await this.playerModel.find().exec();

    const returnedList = await this.playerModel.find({ email }).exec();

    if (returnedList.length == 0)
      throw new NotFoundException('Player not found.');

    return returnedList;
  }

  public async delete(email: string): Promise<any> {
    await this.playerModel.remove({ email });
  }
}
