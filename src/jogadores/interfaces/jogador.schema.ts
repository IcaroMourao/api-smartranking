import { Schema } from 'mongoose';

export const JogadorSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    nome: String,
    ranking: String,
    rankingPosition: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
