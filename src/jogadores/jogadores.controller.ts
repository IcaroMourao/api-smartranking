import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.intarface';
import { JogadoresService } from './jogadores.service';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.getJogadorByEmail(email);
    }
    return await this.jogadoresService.getJogadores();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    return await this.jogadoresService.deletePlayer(email);
  }
}
