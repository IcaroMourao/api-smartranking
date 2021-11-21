import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { Categoria } from './interfaces/categoria.interface';
import { ValidationParameters } from '../common/pipes/validation-parameters.pipe';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async storeCategory(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return await this.categoriasService.storeCategory(criarCategoriaDto);
  }

  @Get()
  async getCategories(): Promise<Array<Categoria>> {
    return await this.categoriasService.getCategories();
  }

  @Get('/:categoria')
  @UsePipes(ValidationPipe)
  async getCategoryById(
    @Param('categoria', ValidationParameters) categoria: string,
  ): Promise<Categoria> {
    return await this.categoriasService.getCategoryById(categoria);
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria', ValidationParameters) categoria: string,
  ): Promise<any> {
    return await this.categoriasService.updateCategory(categoria, atualizarCategoriaDto);
  }

  @Post('/:categoria/jogadores/:playerId')
  @UsePipes(ValidationPipe)
  async assingCategoryToPlayer(
    @Param('categoria') categoria: string,
    @Param('playerId', ValidationParameters) playerId: string,
  ): Promise<any> {
    return await this.categoriasService.assingCategoryToPlayer({ categoria, playerId });
  }
}
