import { RepositoryLocator } from '@infrastructure/locators/repository.locator';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const EntityByIdPipe = (entityName: string) => {
  @Injectable()
  class EntityByIdMixinPipe {
    constructor(readonly repositoryLocator: RepositoryLocator) {}

    async transform(id: string): Promise<any> {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`The provided ID "${id}" is not a valid ObjectId`);
      }

      const entityRepository = this.repositoryLocator.getRepository(entityName);
      const entity = await entityRepository.findOne(id);

      if (!entity) {
        throw new BadRequestException(`Invalid ${entityName} id`);
      }

      return entity;
    }
  }

  return EntityByIdMixinPipe;
};
