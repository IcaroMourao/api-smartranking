import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
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