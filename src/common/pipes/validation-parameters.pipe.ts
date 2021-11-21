import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ValidationParameters implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`);
    }

    if (metadata.data === 'categoriaId' && !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`O id passado na url (${value}) não é válido`);
    }

    if (metadata.data === 'playerId' && !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`O playerId passado na url (${value}) não é válido`);
    }

    if (metadata.data === 'id' && !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`O id passado na url (${value}) não é válido`);
    }

    return value;
  }
}
