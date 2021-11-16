import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadorDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly nome: string;
}
