import { ProductRequestDto } from '@application/product/Dtos/request/product.request.dto';
import { CreatedProductResponseDto } from '@application/product/Dtos/response/created-product.response.dto';
import { CreateProductUsecase } from '@application/product/usecase/create-product.usercase';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, HttpStatus, Injectable, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
@Controller('products')
export class ProductController {
  constructor(private readonly createProductUsecase: CreateProductUsecase) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: ProductRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created successfully',
    type: CreatedProductResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Product already exists' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Roles([RolesEnum.Admin, RolesEnum.Seller])
  @Post('create')
  async create(
    @Body() productRequestDto: ProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<CreatedProductResponseDto> {
    const response = await this.createProductUsecase.execute(productRequestDto, user);
    return {
      message:
        user.getRole() === RolesEnum.Seller
          ? 'Product added successfully and is pending approval by admin'
          : 'Product created successfully',
      data: response,
    };
  }
}
//get products via status
