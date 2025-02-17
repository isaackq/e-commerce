import { FollowUpTransformer } from '@application/transformer/follow.transformer';
import { FollowUpUseCase } from '@application/usecase/follow-up.usecase';
import { FollowUpController } from '@infrastructure/controllers/follow-up.controller';
import { FollowUpRepository } from '@infrastructure/repositories/follow-up.repository';
import { FollowUp, FollowUpSchema } from '@infrastructure/schemas/follow-up.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: FollowUp.name, schema: FollowUpSchema }]), FollowUpModule],
  controllers: [FollowUpController],
  providers: [
    FollowUpUseCase,
    FollowUpTransformer,
    Connection,
    {
      provide: 'FollowUpRepository',
      useClass: FollowUpRepository,
    },
  ],
})
export class FollowUpModule {}
