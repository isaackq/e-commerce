import { IsString, IsNotEmpty } from "class-validator";

export class MessageDto {

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}