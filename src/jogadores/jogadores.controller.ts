import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.intarface';
import { JogadoresService } from './jogadores.service';
import { ValidationParameters } from '../common/pipes/validation-parameters.pipe';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async storePlayer(@Body() criarJogadorDto: CriarJogadorDto) {
    const jogador = await await this.jogadoresService.storePlayer(criarJogadorDto);

    return { id: jogador._id };
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('id', ValidationParameters) id: string,
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
  ) {
    const jogador = await await this.jogadoresService.updatePlayer(id, atualizarJogadorDto);

    return { id: jogador._id };
  }

  @Get()
  async getPlayers(): Promise<Jogador[]> {
    return await this.jogadoresService.getJogadores();
  }

  @Get('/:id')
  async getPlayerByEmail(@Param('id', ValidationParameters) id: string): Promise<Jogador> {
    return await this.jogadoresService.getJogadorById(id);
  }

  @Delete('/:id')
  async deletarJogador(@Param('id', ValidationParameters) id: string): Promise<any> {
    return await this.jogadoresService.deletePlayer(id);
  }
}
