import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class JogadoresValidationParameters implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`);
    }
    if (metadata.data === 'id' && !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`O id passado na url (${value}) não é válido`);
    }

    return value;
  }
}
