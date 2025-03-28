import { EmploymentEnum } from '@domain/enums/employment.enum';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { ExperienceEnum } from '@domain/enums/experience.enum';
import { Birthday } from '@domain/objectsValues/Birthday';
import { Manager } from '@domain/entities/user/Manager';
import { RolesEnum } from '@domain/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class ManagerResponseDto extends UserResponseDto {
  @ApiProperty({
    example: 'Official',
    description: 'The employment',
    enum: EmploymentEnum,
  })
  public employment: EmploymentEnum;

  @ApiProperty({
    example: 'Full-Time',
    description: 'The employment status',
    enum: EmploymentStatusEnum,
  })
  public employmentStatus: EmploymentStatusEnum;

  @ApiProperty({
    example: '2025-03-04T09:00:00.000Z',
    description: 'The date when employment starts',
    type: Date,
  })
  public contractStartDate: Date;

  @ApiProperty({
    example: '2026-03-04T09:00:00.000Z',
    description: 'The date when the employment contract expires',
    type: Date,
  })
  public contractEndDate: Date;

  @ApiProperty({
    example: '2000',
    description: 'The salary of the employee',
    type: Number,
  })
  public salary: number;

  @ApiProperty({
    example: '5',
    description: 'Years of experience',
    type: Number,
  })
  public experienceYears: number;

  @ApiProperty({
    example: 'Senior',
    description: 'Experience status status',
    enum: ExperienceEnum,
  })
  public experienceStatus: ExperienceEnum;

  private constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: Birthday | Date,
    mobileNumber: string,
    country: string,
    city: string,
    nationality: string,
  ) {
    super(id, firstname, lastname, email, birthday, mobileNumber, RolesEnum.MANAGER, country, city, nationality);
  }

  public static createFromEntity(manager: Manager): ManagerResponseDto {
    const managerResponse = new ManagerResponseDto(
      manager.id,
      manager.firstname,
      manager.lastname,
      manager.email,
      manager.birthday,
      manager.mobileNumber,
      manager.country,
      manager.city,
      manager.nationality,
    );

    managerResponse.employment = manager.employment;
    managerResponse.employmentStatus = manager.employmentStatus;
    managerResponse.contractStartDate = manager.contractStartDate;
    managerResponse.contractEndDate = manager.contractEndDate;
    managerResponse.salary = manager.salary;
    managerResponse.experienceYears = manager.experienceYears;
    managerResponse.experienceStatus = manager.experienceStatus;

    return managerResponse;
  }
}
