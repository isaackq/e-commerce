import { AdminRequestDto } from '@application/user/Dtos/request/admin-request.dto';
import { CustomerRequestDto } from '@application/user/Dtos/request/customer-request.dto';
import { SellerRequestDto } from '@application/user/Dtos/request/seller-request.dto';
import { AdminResponseDto } from '@application/user/Dtos/response/admin.response.dtp';
import { CustomerResponseDto } from '@application/user/Dtos/response/customer.response.dto';
import { SellerResponseDto } from '@application/user/Dtos/response/seller.response.dot';
import { RegisterAdminUsecase } from '@application/user/usecase/register-admin.usecase';
import { RegisterCustomerUseCase } from '@application/user/usecase/register-customer.usecase';
import { RegesterSellerUsecase } from '@application/user/usecase/register-seller.usecase copy';
import { RolesEnum } from '@domain/enums/role.enum';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, HttpStatus, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    private readonly registerSellerUsecase: RegesterSellerUsecase,
    private readonly registerAdminUsecase: RegisterAdminUsecase,
  ) {}

  @ApiOperation({ summary: 'Add a new customer' })
  @ApiBody({ type: CustomerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Customer was added successfully.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @Post('/add-customer')
  async registerCustomer(
    @Body(new ValidationPipe()) customerRequestDto: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return await this.registerCustomerUseCase.execute(customerRequestDto);
  }

  @ApiOperation({ summary: 'Add a new seller' })
  @ApiBody({ type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Seller was added successfully.',
    type: SellerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @Post('/add-seller')
  async registerSeller(@Body(new ValidationPipe()) sellerRequestDto: SellerRequestDto): Promise<SellerResponseDto> {
    return await this.registerSellerUsecase.execute(sellerRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new admin' })
  @ApiBody({ type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Admin was added successfully.',
    type: SellerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @Roles([RolesEnum.Admin])
  @Post('/add-admin')
  async registerAdmin(@Body(new ValidationPipe()) adminRequestDto: AdminRequestDto): Promise<AdminResponseDto> {
    return await this.registerAdminUsecase.execute(adminRequestDto);
  }
}
