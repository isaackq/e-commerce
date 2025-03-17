import { Reflector } from '@nestjs/core';

export interface MapEntityMetadata {
  entityName: string;
  paramName?: string;
  source?: 'params' | 'query' | 'body';
  authorizeOwner?: boolean;
}

export const MapEntity = Reflector.createDecorator<MapEntityMetadata>();
