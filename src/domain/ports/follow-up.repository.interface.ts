import { FollowUp } from '@domain/entities/FollowUp';

export interface FollowUpRepositoryInterface {
  save(followUp: FollowUp): Promise<FollowUp>;
  findOne(): void;
}
