import { EmploymentEnum } from '@domain/enums/employment.enum';
import { EmploymentStatusEnum } from '@domain/enums/employment-status.enum';
import { ExperienceEnum } from '@domain/enums/experience.enum';
import { Employee } from '@domain/entities/user/Employee';
import { Birthday } from '@domain/objectsValues/Birthday';
import { RolesEnum } from '@domain/enums/roles.enum';
import { PositionResponseDto } from '@application/position/dtos/response/position.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class EmployeeResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'The position of the employee',
    type: PositionResponseDto,
  })
  public position: PositionResponseDto;

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
    super(id, firstname, lastname, email, birthday, mobileNumber, RolesEnum.EMPLOYEE, country, city, nationality);
  }

  public static createFromEntity(employee: Employee): EmployeeResponseDto {
    const employeeResponse = new EmployeeResponseDto(
      employee.id,
      employee.firstname,
      employee.lastname,
      employee.email,
      employee.birthday,
      employee.mobileNumber,
      employee.country,
      employee.city,
      employee.nationality,
    );

    employeeResponse.employment = employee.employment;
    employeeResponse.employmentStatus = employee.employmentStatus;
    employeeResponse.contractStartDate = employee.contractStartDate;
    employeeResponse.contractEndDate = employee.contractEndDate;
    employeeResponse.salary = employee.salary;
    employeeResponse.experienceYears = employee.experienceYears;
    employeeResponse.experienceStatus = employee.experienceStatus;
    employeeResponse.position = PositionResponseDto.createFromEntity(employee.position);

    return employeeResponse;
  }
}
