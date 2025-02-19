import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards';
import { Roles } from '../auth/decoraters/roles.decoraters';
import { Role } from '../auth/enums/role.enum';
import { LoggerService } from '../logger/logger.service';
import { Request } from 'express';

// Define an interface to include user information in the request
interface RequestWithUser extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly logger: LoggerService,
  ) {}

  @Post('create')
  @Roles(Role.Client) 
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createPurchase(@Req() req: RequestWithUser, @Body() body: any) {
    const userId = req.user?.id;
    this.logger.log(`User ${userId} is creating a purchase`);
    const { productId, quantity, price } = body;

    // Call the purchase service to create the purchase
    return this.purchasesService.createPurchase(userId, productId, quantity, price);
  }

  @Post('assign/:id')
  @Roles(Role.SuperAdmin, Role.Rider) // Allow only admins or riders to assign
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async assignPurchase(@Param('id') id: string, @Body() body: any, @Req() req: RequestWithUser) {
    const riderId = body.riderId;
    this.logger.log(`Admin/Rider ${req.user?.id} is assigning purchase ${id} to rider ${riderId}`);

    return this.purchasesService.assignRider(id, riderId);
  }

  @Get('customer')
  @Roles(Role.Client) // Allow only clients to view their purchases
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getCustomerPurchases(@Req() req: RequestWithUser) {
    const customerId = req.user?.id;
    this.logger.log(`User ${customerId} is fetching their purchases`);

    return this.purchasesService.getCustomerPurchases(customerId);
  }

  @Get('rider')
  @Roles(Role.Rider) // Allow only riders to view their assigned purchases
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getRiderPurchases(@Req() req: RequestWithUser) {
    const riderId = req.user?.id;
    this.logger.log(`Rider ${riderId} is fetching their assigned purchases`);

    return this.purchasesService.getRiderAssignedPurchases(riderId);
  }
}
