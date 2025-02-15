import { FollowUpDto } from "@application/dtos/follow-up.dto";
import { FollowUpTransformer } from "@application/transformer/follow.transformer";
import { FollowUp } from "@domain/entities/FollowUp";
import { FollowUpRepositoryInterface } from "@domain/ports/follow-up.repository.interface";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class FollowUpUseCase {
  constructor(
    @Inject('FollowUpRepository')
    private readonly followUpRepositoryInterface: FollowUpRepositoryInterface,
    private readonly followUpTransformer: FollowUpTransformer
  ) { }

  async execute(followUpDto: FollowUpDto): Promise<FollowUp> {
    const follow = await this.followUpTransformer.toEntitiy(followUpDto);
    
    return await this.followUpRepositoryInterface.save(follow);
  }
}