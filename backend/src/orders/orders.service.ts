import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../rider-tracking/schemas/order.schema'; // Import Order schema
import { DeliveryStatus } from '../rider-tracking/schemas/order.schema'; // Import enum for status

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) { }

    // Get all orders
    async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().populate('rider').exec();
    }



  // Get orders by date range
  async getOrdersByDateRange(dateRange: string): Promise<number> {
    const now = new Date();
    let startDate: Date;
    let endDate = now;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'yesterday':
        startDate = new Date(now.setDate(now.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;
      case 'thisWeek':
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'lastWeek':
        startDate = new Date(now.setDate(now.getDate() - now.getDay() - 7));
        endDate = new Date(now.setDate(now.getDate() + 6));
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last2Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() - 1, 0);
        break;
      default:
        throw new Error('Invalid date rangeee');
    }

    return this.orderModel
      .countDocuments({ createdAt: { $gte: startDate, $lte: endDate } })
      .exec();
  }





    //   // Get order by ID
    //   async getOrderById(id: string): Promise<Order> {
    //     return this.orderModel.findById(id).populate('rider').exec();
    //   }

    // OrdersService - getOrderById
    
    async getOrderById(id: string): Promise<Order> {
        try {
            const order = await this.orderModel.findById(id).populate('rider').exec();
            return order;
        } catch (error) {
            throw new Error(`Order not found with ID: ${id}`);
        }
    }




    // Get orders within a date range
    async getOrdersByDate(startDate: string, endDate: string): Promise<Order[]> {
        return this.orderModel.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).populate('rider').exec();
    }

    // OrdersService
    async getOrderCount(): Promise<number> {
        return this.orderModel.countDocuments().exec();
    }


}

