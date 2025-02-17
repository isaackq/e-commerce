import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FollowUpDto {
  @IsNumber()
  @IsNotEmpty()
  public project: number;

  @IsNumber()
  @IsNotEmpty()
  public employee: number;

  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  public attachment: string | null;

  constructor(project: number, employee: number, subject: string, attachment: string | null) {
    this.project = project;
    this.employee = employee;
    this.subject = subject;
    this.attachment = attachment;
  }
}
