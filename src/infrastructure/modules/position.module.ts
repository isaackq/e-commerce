import { PositionTransformer } from '@application/position/transformer/position.transformer';
import { CreatePositionUsecase } from '@application/position/usecase/create-position.usecase';
import { PositionController } from '@infrastructure/controllers/position.controller';
import { PositionRepository } from '@infrastructure/repositories/position.repository';
import { Position, PositionSchema } from '@infrastructure/schemas/position.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Position.name, schema: PositionSchema }])],
  controllers: [PositionController],
  providers: [
    CreatePositionUsecase,
    PositionTransformer,
    {
      provide: 'PositionRepository',
      useClass: PositionRepository,
    },
  ],
})
export class PositiontModule {}
