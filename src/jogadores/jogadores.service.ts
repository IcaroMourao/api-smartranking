import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.intarface';

@Injectable()
export class JogadoresService {
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  async storePlayer(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email, phoneNumber } = criarJogadorDto;
    const foundedPlayer = await this.jogadorModel
      .findOne({ $or: [{ email }, { phoneNumber }] })
      .exec();
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    if (foundedPlayer) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} ou telefone ${phoneNumber} já cadastrado`,
      );
    }

    try {
      return await jogadorCriado.save();
    } catch (error) {
      throw new InternalServerErrorException(`Erro desconhecido`);
    }
  }

  async updatePlayer(id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<Jogador> {
    await this.findPlayer(id);
    const { phoneNumber } = atualizarJogadorDto;

    if (phoneNumber) {
      const foundedPlayer = await this.jogadorModel.findOne({ phoneNumber }).exec();

      if (foundedPlayer) {
        throw new BadRequestException(`Já existe um jogador com telefone ${phoneNumber}`);
      }
    }

    return await this.jogadorModel
      .findOneAndUpdate({ _id: id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async getJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async getJogadorById(id: string): Promise<Jogador> {
    const foundedPlayer = await this.findPlayer(id);

    return foundedPlayer;
  }

  async deletePlayer(id: string): Promise<any> {
    await this.findPlayer(id);

    return await this.jogadorModel.deleteOne({ id });
  }

  private async findPlayer(id): Promise<Jogador> {
    const foundedPlayer = await this.jogadorModel.findOne({ _id: id }).exec();

    if (!foundedPlayer) {
      throw new NotFoundException(`Jogador com id ${id} não encontrado`);
    }

    return foundedPlayer;
  }
}
