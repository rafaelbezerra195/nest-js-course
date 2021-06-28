import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  public async createPlayer(newPlayer: CreatePlayerDto): Promise<Player> {
    const player = await this.playerModel
      .findOne({ email: newPlayer.email })
      .exec();
    if (!_.isNil(player))
      throw new BadRequestException('Player already exists.');

    const createdPlayer = new this.playerModel(newPlayer);
    return createdPlayer.save();
  }

  public async updatePlayer(
    _id: string,
    player: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerModel.findOneAndUpdate({ _id }, { $set: player }).exec();
  }

  public async getPlayer(_id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id }).exec();
    if (_.isNil(player)) throw new NotFoundException('Player not found.');

    return player;
  }

  public async getPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  public async delete(_id: string): Promise<any> {
    this.playerModel.deleteOne({ _id });
  }
}
