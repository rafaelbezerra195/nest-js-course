import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    rankingPosition: Number,
    urlPhoto: String,
  },
  {
    timestamps: true,
    collection: 'player',
  },
);
