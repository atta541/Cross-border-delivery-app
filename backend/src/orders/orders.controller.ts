import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../rider-tracking/schemas/order.schema'; // Import Order schema

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Get all orders with status and counts
  @Get('all')
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }


  @Get('daterange')
  async getOrders(@Query('dateRange') dateRange: string): Promise<number> {
    return this.ordersService.getOrdersByDateRange(dateRange);
  }


  // Get order by ID
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  // Get orders by date range
  @Get('by-date')
  async getOrdersByDate(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<Order[]> {
    return this.ordersService.getOrdersByDate(startDate, endDate);
  }

  // Get order count (This route should be handled separately to avoid confusion)
  @Get('count')
  async getOrderCount(): Promise<number> {
    return this.ordersService.getOrderCount();
  }
}
