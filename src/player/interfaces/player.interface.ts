import { Document } from 'mongoose';
export interface Player extends Document {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  nome: string;
  ranking: string;
  rankingPosition: number;
  urlPhoto: string;
}
