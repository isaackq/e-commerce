import { EmploymentEnum } from '@domain/enums/employment.enum';
import { User } from './User';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { ExperienceEnum } from '@domain/enums/experience.enum';
import { RolesEnum } from '@domain/enums/roles.enum';

export class Manager extends User {
  public employment: EmploymentEnum;
  public employmentStatus: EmploymentStatusEnum;
  public contractStartDate: Date;
  public contractEndDate: Date;
  public salary: number;
  public experienceYears: number;
  public experienceStatus: ExperienceEnum;

  getRole(): RolesEnum {
    return RolesEnum.MANAGER;
  }
}
