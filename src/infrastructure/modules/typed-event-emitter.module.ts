import { TypedEventEmitter } from '@infrastructure/providers/typed-event-emitter.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [TypedEventEmitter],
  exports: [TypedEventEmitter],
})
export class TypedEventEmitterModule {}
