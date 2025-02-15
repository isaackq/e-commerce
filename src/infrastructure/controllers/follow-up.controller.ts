import { FollowUpDto } from "@application/dtos/follow-up.dto";
import { FollowUpUseCase } from "@application/usecase/follow-up.usecase";
import { Body, Controller, Get, Header, Post, ValidationPipe } from "@nestjs/common";

@Controller('/follow-up')
export class FollowUpController {
  constructor(
    private readonly followUpUseCase: FollowUpUseCase,
  ) { }

  @Post()
  @Header('Content-Type', 'application/json')
  async following(
    @Body(new ValidationPipe()) followUpDto: FollowUpDto
  ): Promise<string> {
    const following = await this.followUpUseCase.execute(followUpDto);
    
    return JSON.stringify(following);
  }

  @Get()
  getFollowers() {
    return 'hi'
  }
}