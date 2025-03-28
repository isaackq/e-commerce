import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { UserRequestDto } from './user.request.dto';
import { EmploymentEnum } from '@domain/enums/employment.enum';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { Type } from 'class-transformer';
import { ExperienceEnum } from '@domain/enums/experience.enum';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeRequestDto extends UserRequestDto {
  @ApiProperty({
    example: '679767b26104d6ee49c2f6e4',
    description: 'The position id of the employee',
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  public positionId: string;

  @ApiProperty({
    example: 'Official',
    description: 'The employment',
    enum: EmploymentEnum,
  })
  @IsNotEmpty()
  @IsEnum(EmploymentEnum)
  public employment: EmploymentEnum;

  @ApiProperty({
    example: 'Full-Time',
    description: 'The employment status',
    enum: EmploymentStatusEnum,
  })
  @IsNotEmpty()
  @IsEnum(EmploymentStatusEnum)
  public employmentStatus: EmploymentStatusEnum;

  @ApiProperty({
    example: '2025-03-04T09:00:00.000Z',
    description: 'The date when employment starts',
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public contractStartDate: Date;

  @ApiProperty({
    example: '2026-03-04T09:00:00.000Z',
    description: 'The date when the employment contract expires',
    type: Date,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  public contractEndDate: Date;

  @ApiProperty({
    example: '2000',
    description: 'The salary of the employee',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  public salary: number;

  @ApiProperty({
    example: '5',
    description: 'Years of experience',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  public experienceYears: number;

  @ApiProperty({
    example: 'Senior',
    description: 'Experience status status',
    enum: ExperienceEnum,
  })
  @IsNotEmpty()
  @IsEnum(ExperienceEnum)
  public experienceStatus: ExperienceEnum;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    birthday: Date | null,
    mobileNumber: string | null,
    country: string,
    city: string,
    nationality: string,
    position: string,
    employment: EmploymentEnum,
    employmentStatus: EmploymentStatusEnum,
    contractStartDate: Date,
    contractEndDate: Date,
    salary: number,
    experienceYears: number,
    experienceStatus: ExperienceEnum,
  ) {
    super(firstname, lastname, email, birthday, mobileNumber, country, city, nationality);

    this.positionId = position;
    this.employment = employment;
    this.employmentStatus = employmentStatus;
    this.contractStartDate = contractStartDate;
    this.contractEndDate = contractEndDate;
    this.salary = salary;
    this.experienceYears = experienceYears;
    this.experienceStatus = experienceStatus;
  }
}
