import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Delivery } from '@src/payment/schemas/delivery.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery>,
)
   {}

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async getAllUsers(page: number = 1, limit: number = 4) {
    const skip = (page - 1) * limit; // Correct 1-based page logic
    const users = await this.userModel.find().skip(skip).limit(limit);
    const totalUsers = await this.userModel.countDocuments();
  
    return {
      data: users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    };
  }
  




  

  // async getUserDeliveries(userId: string) {
  //   return this.deliveryModel.find({
  //     riderId: new Types.ObjectId(userId),
  //     deliverystatus: 'delivered', // Filter only delivered orders
  //   });
  // }



}
