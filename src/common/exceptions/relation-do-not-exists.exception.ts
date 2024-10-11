import { BadRequestException } from '@nestjs/common';

export class RelationDoNotExistsException extends BadRequestException {
  constructor(msg?: string) {
    super(msg ?? 'Relation do not exist');
  }
}