import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;
@Schema({ timestamps: true, collection: 'Player' })
export class Player {
  @Prop({ unique: true })
  email: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  nome: string;
  @Prop()
  ranking: string;
  @Prop()
  rankingPosition: string;
  @Prop()
  urlPhoto: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
