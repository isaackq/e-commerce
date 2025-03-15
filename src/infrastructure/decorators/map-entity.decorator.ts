import { Reflector } from '@nestjs/core';

export interface MapEntityMetadata {
  entityName: string;
  idKey?: string;
  source?: 'params' | 'query' | 'body';
}

export const MapEntity = Reflector.createDecorator<MapEntityMetadata>();
