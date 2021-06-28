import { Document } from 'mongoose';
import { Player } from 'src/player/interfaces/player.schema';

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Array<Event>;
  players: Array<Player>;
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
