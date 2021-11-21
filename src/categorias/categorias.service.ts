import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AssingCategoryDto } from './dtos/assing-category.dto';
import { Categoria } from './interfaces/categoria.interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async storeCategory(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    const foundedCategory = await this.categoriaModel.findOne({ categoria }).exec();

    if (foundedCategory) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
    }

    const categoriaModel = new this.categoriaModel(criarCategoriaDto);

    try {
      return await categoriaModel.save();
    } catch (error) {
      throw new InternalServerErrorException('Erro inesperado');
    }
  }

  async getCategories(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async getCategoryById(categoria: string): Promise<Categoria> {
    this.logger.debug('Finding one category...');
    const category = await this.categoriaModel.findOne({ categoria }).exec();

    if (!category) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada`);
    }

    return category;
  }

  async updateCategory(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<any> {
    const category = await this.categoriaModel.findOne({ categoria }).exec();

    if (!category) {
      throw new BadRequestException(`Categoria com o id ${categoria} não encontrada`);
    }

    return await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto })
      .exec();
  }

  async assingCategoryToPlayer(params: AssingCategoryDto): Promise<any> {
    const { categoria, playerId } = params;
    const foundedCategory = await this.categoriaModel.findOne({ categoria }).exec();

    await this.jogadoresService.getJogadorById(playerId);

    const isPlayerRegisteredInCategory = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(playerId)
      .exec();

    if (!foundedCategory) {
      throw new BadRequestException(`Categoria ${categoria} não cadastrada`);
    }
    if (isPlayerRegisteredInCategory.length > 0) {
      throw new BadRequestException(`Jogador ${playerId} já cadastrado na categoria ${categoria}`);
    }

    foundedCategory.jogadores.push(playerId);
    await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: foundedCategory }).exec();
  }
}
