import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { RepositoryLocator } from '@infrastructure/locators/repository.locator';
import { Reflector } from '@nestjs/core';
import { MapEntity } from '../decorators/map-entity.decorator';
import { AppRequest } from '@infrastructure/requests/app-request';
import { Types } from 'mongoose';

@Injectable()
export class EntityOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly repositoryLocator: RepositoryLocator,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const user = request.user;

    const metadata = this.reflector.get(MapEntity, context.getHandler());

    if (!metadata) {
      throw new BadRequestException('Metadata not found for MapEntity');
    }

    const { entityName, idKey = 'id', source = 'params' } = metadata;

    const entityId = request[source][idKey];

    if (!entityId) {
      throw new BadRequestException('ID is required');
    }

    if (!Types.ObjectId.isValid(entityId)) {
      throw new BadRequestException(`The provided ID "${entityId}" is not a valid ObjectId`);
    }

    if (!entityName) {
      throw new BadRequestException('entityName is required');
    }

    const entityRepository = this.repositoryLocator.getRepository(metadata.entityName);
    const entity = await entityRepository.findOne(entityId);

    if (!entity) {
      throw new BadRequestException('Invalid id');
    }

    request.entity = entity;

    return entity.getCreatedBy().id === user.id;
  }
}
