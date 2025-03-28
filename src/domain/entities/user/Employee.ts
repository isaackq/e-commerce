import { EmploymentEnum } from '@domain/enums/employment.enum';
import { User } from './User';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { Position } from '../Position';
import { ExperienceEnum } from '@domain/enums/experience.enum';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Rating } from '../Rating';

export class Employee extends User {
  public position: Position;
  public employment: EmploymentEnum;
  public employmentStatus: EmploymentStatusEnum;
  public contractStartDate: Date;
  public contractEndDate: Date;
  public salary: number;
  public experienceYears: number;
  public experienceStatus: ExperienceEnum;
  public rating: Rating;

  getRole(): RolesEnum {
    return RolesEnum.EMPLOYEE;
  }
}
