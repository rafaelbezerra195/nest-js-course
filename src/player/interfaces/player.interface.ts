import { Document } from 'mongoose';
export interface Player extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  nome: string;
  ranking: string;
  rankingPosition: number;
  urlPhoto: string;
}
