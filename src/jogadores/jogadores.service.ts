import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.intarface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const foundedPlayer = this.jogadores.find((jogador) => jogador.email === email);

    if (!foundedPlayer) {
      return this.criar(criarJogadorDto);
    }
    return this.atualizar(foundedPlayer, criarJogadorDto);
  }

  async getJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async getJogadorByEmail(email): Promise<Jogador> {
    return this.jogadores.find((jogador) => jogador.email === email);
  }

  async deletePlayer(email): Promise<void> {
    this.jogadores = this.jogadores.filter((jogador) => jogador.email !== email);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, phoneNumber } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      email,
      phoneNumber,
      ranking: 'A',
      rankingPosition: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);

    this.jogadores.push(jogador);
  }

  private atualizar(foundedPlayer: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;
    foundedPlayer.nome = nome;
  }
}
