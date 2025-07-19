import { AddProductToCartRequestDto } from '@application/cart/Dtos/request/add-product-to-cart.request.dto';
import { CartResponseDto } from '@application/cart/Dtos/response/cart.response.dto';
import { AddProductToCartUsecase } from '@application/cart/usercase/add-product-to-cart.usecase';
import { GetCustomerCartUsecase } from '@application/cart/usercase/get-customer-cart.usecase';
import { Customer } from '@domain/entities/User/Customer';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(
    private readonly addProductToCartUsecase: AddProductToCartUsecase,
    private readonly getCustomerCartUsecase: GetCustomerCartUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add products to shopping cart' })
  @ApiBody({ type: AddProductToCartRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Added to cart successfuly', type: CartResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles([RolesEnum.Customer])
  @Post('add-to-cart')
  async addProdcutToCart(@Body() addProductToCartRequestDto: AddProductToCartRequestDto, @CurrentUser() user: User) {
    return await this.addProductToCartUsecase.execute(addProductToCartRequestDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show the cart of the current customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Fetched Successfully', type: CartResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cart Not Found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles([RolesEnum.Customer])
  @Get('user-cart')
  async getCart(@CurrentUser() user: User): Promise<CartResponseDto> {
    return await this.getCustomerCartUsecase.execute(user as Customer);
  }
}
