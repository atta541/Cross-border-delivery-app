import { Controller, Post, Body, UseGuards, Req, Put, Delete, Get } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddBasketItemDto } from './dto/add-basket.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decoraters/roles.decoraters';
import { Request } from 'express';
import { UpdateBasketItemDto } from './dto/update-basket.dto';
import { RemoveBasketItemDto } from './dto/remove-basket.dto';
import { CheckoutDto } from './dto/checkout.dto';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

@Controller('cart')
export class CartController {
  constructor(private readonly basketService: BasketService) { }
  @Post('add')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addCartItem(
    @Body() addCartItemDto: AddBasketItemDto,
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.id;
    console.log("userid: " + userId);
    for (const item of addCartItemDto.items) {

      
      await this.basketService.addToBasket(userId, item.productId, item.quantity);
    }
    return { message: 'Items added to cart successfully' };
  }

  @Get('items')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getCartItems(@Req() req: RequestWithUser) {
    console.log("getCartItems hittign")
    const userId = req.user.id;
    const items = await this.basketService.getCartItems(userId);
    return { items };
  }


  @Put('update')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateCartItem(
    @Body() updateBasketItemDto: UpdateBasketItemDto,
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.id;
    await this.basketService.updateBasketItem(userId, updateBasketItemDto.productId, updateBasketItemDto.quantity);
    return { message: 'Cart updated successfully' };
  }

  @Delete('remove')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async removeCartItem(
    @Body() removeBasketItemDto: RemoveBasketItemDto,
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.id;
    console.log("user id in controller: " + userId);
    await this.basketService.removeBasketItem(userId, removeBasketItemDto.productId);
    return { message: 'Item removed from cart successfully' };
  }

  // @Post('checkout')
  // @Roles(Role.Client)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async completeCheckout(
  //   @Body() checkoutDto: CheckoutDto,
  //   @Req() req: RequestWithUser,
  // ) {
  //   console.log("checkout hittign")
  //   const userId = req.user.id;
  //   const responses = [];
  //   // stage 1
  //   for (const item of checkoutDto.items) {
  //     console.log("item: " + item)
  //     const response = await this.basketService.completeCheckout(userId, item.productId, item.quantity);
  //     responses.push(response);
  //   }
  //   return { message: 'Checkout completed for all items', responses };
  // }


  @Post('checkout')
  @Roles(Role.Client)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async completeCheckout(
    @Body() checkoutDto: CheckoutDto,
    @Req() req: RequestWithUser,
  ) {
    console.log("checkout hitting")
    const userId = req.user.id;
    const responses = [];

    for (const item of checkoutDto.items) {
      let response;

      if (item.type === 'valid' && item.productId) {
        // Standard checkout for items with productId
        response = await this.basketService.completeCheckout(userId, item.productId, item.quantity);
      } else if (item.type === 'unknown') {
        // For items without productId (custom items), charge the user
        response = await this.basketService.handleCustomCheckout(userId,);
      }

      responses.push(response);
    }

    return { message: 'Checkout completed for all items', responses };
  }

}