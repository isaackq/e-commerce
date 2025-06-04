import { ClientRequestDto } from '@application/client/dtos/client-request.dto';
import { CreateClientUseCase } from '@application/client/usecases/create-client.usecase';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Client } from '@domain/entities/Client';
import { RolesEnum } from '@domain/enums/roles.enum';
import { Body, Controller, Header, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/clients')
export class ClientController {
  constructor(private readonly createClientUsecase: CreateClientUseCase) {}

  @ApiOperation({ summary: 'Add a new client' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The client has been successfully added', type: Object })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'A client with this identity number already exists.' })
  @Roles([RolesEnum.OWNER])
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(new ValidationPipe()) clientRequestDto: ClientRequestDto): Promise<Client> {
    return await this.createClientUsecase.execute(clientRequestDto);
  }
}
