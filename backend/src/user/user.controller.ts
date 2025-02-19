import { Controller, Get, UseGuards, Req, Param, Query, Post } from '@nestjs/common'; // Import Req
import { UserService } from './user.service';
import { Roles } from '../auth/decoraters/roles.decoraters'; 
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards'; 
import { Role } from '../auth/enums/role.enum'; 
import { LoggerService } from '../logger/logger.service'; 
import { Request } from 'express'; // Import Request
import { User } from '@src/auth/schemas/user.schema';
import {PaymentService} from '../payment/payment.service';

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';


// Define an interface that extends Request to include the user object
interface RequestWithUser extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

//localhost:3000/user/test
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paymentService: PaymentService, // Inject PaymentService here

    private readonly logger: LoggerService, 
  ) {}

  @Get('test')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  getTestRoles(): string {
    this.logger.log('GET /users/test called');
    return 'Testing roles only for admin';
  }

  @Get('testing')
  @Roles(Role.Rider, Role.Client, Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  getTestingRoles(@Req() req: RequestWithUser): string {
    const userId = req.user?.id; // Safe access using optional chaining
    this.logger.log(`User ID: ${userId}`);
    console.log(`User ID: ${userId}`); // Log the user ID in the console
    return `Testing roles Rider, client, superadmin - User ID: ${userId}`;
  }



  @Get(':id')
async getUserById(@Param('id') id: string): Promise<User> {
  return this.userService.findById(id);
}




@Post('me')
@Roles(Role.Rider, Role.Client, Role.SuperAdmin)
@UseGuards(AuthGuard('jwt'), RolesGuard) 
async getUserFromToken(@Req() req: RequestWithUser) {
  const userId = req.user?.id;  // Extract user ID from the JWT token

  if (!userId) {
    throw new Error('User not authenticated');  // If no user ID, throw an error
  }

  try {
    // Fetch the user from the database using the extracted userId
    const user = await this.userService.findById(userId);
    return user;  // Return the user data
  } catch (error) {
    // Handle any errors that occur during the database lookup
    throw new Error('User not found');
  }
}


  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    
    return this.userService.getAllUsers(page, limit);
  }



  @Get(':id/details')
  async getUserDetails(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    const payments = await this.paymentService.findByUserId(id);
  
    // If payments is null, set it to an empty array
    return { user, payments: payments || [] };
  }


  // @Get('atta')
  // @Roles(Role.Client)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async getUserDeliveries(@Req() req: RequestWithUser) {
  //   const userId = req.user?.id;  // Extract user ID from the JWT token
  //   console.log("helo")
  //   if (!userId) {
  //     throw new Error("User ID is missing from request");  // Handle missing user ID
  //   }
  //   console.log("user id in controller: " + userId);
    
  //   return this.userService.getUserDeliveries(userId);
  // }




 



  
}
