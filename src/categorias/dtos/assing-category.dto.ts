import { IsNotEmpty, IsString } from 'class-validator';

export class AssingCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoria;

  @IsString()
  @IsNotEmpty()
  playerId;
}
