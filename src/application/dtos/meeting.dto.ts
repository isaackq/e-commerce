import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class MeetingDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public link: string;

  @IsString()
  @IsNotEmpty()
  public project: string; // gets the ID for the porject

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  public members: string[]; // gets the IDs of users

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public endDate: Date;

  @IsString()
  public description: string | null;

  constructor(link: string, project: string, members: string[], startDate: Date, endDate: Date, description: string) {
    this.link = link;
    this.project = project;
    this.members = members;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}
