import { Injectable, Logger, Inject, forwardRef, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rider } from './schemas/rider.schema';
import { Order, DeliveryStatus } from './schemas/order.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { LocationGateway } from '../websockets/rider-location-websocket/location.gateway'; // Correct import
import { Delivery } from '@src/payment/schemas/delivery.schema';
import { ObjectId } from 'mongodb';




@Injectable()
export class RiderTrackingService {
  private readonly logger = new Logger(RiderTrackingService.name);


  // Inject LocationGateway here
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService,
    @InjectModel(Rider.name) private riderModel: Model<Rider>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(forwardRef(() => LocationGateway)) // Inject LocationGateway
    private readonly locationGateway: LocationGateway, // Add locationGateway here
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery>,

  ) { }




  // Add a new rider
  async addRider(name: string, phone: string, location: [number, number]): Promise<Rider> {
    const newRider = new this.riderModel({ name, phone, location });
    return newRider.save();
  }






  // Update rider location
  async updateRiderLocation(riderId: string, location: [number, number]): Promise<void> {
    try {
      const rider = await this.riderModel.findByIdAndUpdate(
        riderId,
        { location, lastUpdated: new Date() },
        { new: true }
      );

      if (rider) {
        this.logger.log(`Updated location for rider ${riderId}: ${location}`);
        await this.checkProximity(rider, location);
      } else {
        this.logger.warn(`Rider with ID ${riderId} not found.`);
      }
    } catch (error) {
      this.logger.error(`Error updating rider location: ${error.message}`);
    }
  }

  // Check proximity to update order status
  private async checkProximity(rider: Rider, location: [number, number]) {
    this.logger.log(`Checking proximity for rider ${rider._id} with location ${location}`);

    const order = await this.orderModel.findOne({
      rider: rider._id,
      status: DeliveryStatus.ON_THE_WAY,
    });

    if (order) {
      const distance = this.calculateDistance(order.deliveryLocation, location);
      this.logger.log(`Distance from rider to delivery location for order ${order._id}: ${distance} km`);

      if (distance <= 0.1) {
        order.status = DeliveryStatus.ARRIVED;
        await order.save();
        this.logger.log(`Order ${order._id} status updated to ARRIVED`);


        // Notify the customer as soon as the status is updated to ARRIVED
        await this.notifyCustomer(order);


        // Emit event to update order status
        this.locationGateway.emitOrderStatusUpdate(order._id.toString(), 'ARRIVED');

      }
    } else {
      this.logger.warn(`No active order found for rider ${rider._id}.`);
    }
  }

  // Notify customer method
  private async notifyCustomer(order: Order) {
    this.logger.log(`Notify customer: Order ${order._id} is about to arrive.`);
    try {
      const userId = "67179766127b7b2cc6e288db"; // Pass hardcoded user ID
      await this.notificationsService.sendNotificationToUser(userId);
    } catch (error) {
      this.logger.error(`Notification failed for order ${order._id}: ${error.message}`);
    }
  }

  // Calculate distance between two locations
  private calculateDistance([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]): number {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.logger.log(`Calculated distance: ${distance} km`);
    return distance;
  }

  async deliveredStatus(riderId: string): Promise<void> {
    // Logic for handling the delivery completion
    const rider = await this.riderModel.findById(riderId);
    if (rider) {
      this.logger.log(`Rider ${riderId} has marked the delivery as complete.`);
      // Perform any necessary updates or notifications here
    }


  }


  async getAvailableDeliveries() {
    return this.deliveryModel.find({ deliverystatus: 'pending' });
    
  }

  async assignDelivery(deliveryId: string, riderId: string) {
    const deliveryObjectId = new Types.ObjectId(deliveryId);
    const riderObjectId = new Types.ObjectId(riderId);

    const delivery = await this.deliveryModel.findById(deliveryObjectId);

    if (!delivery || delivery.deliverystatus !== 'pending') {
      throw new NotFoundException('Delivery not available');
    } 

    delivery.riderId = riderObjectId;
    delivery.deliverystatus = 'assigned';
    await delivery.save();

    return { message: 'Delivery assigned successfully', delivery };
  }

  async getAssignedDeliveries(riderId: string) {
    return this.deliveryModel.find({
      riderId: new Types.ObjectId(riderId),
      deliverystatus: { $in: ['assigned', 'pending'] }, // Include both assigned and pending deliveries
    });
  }
  




  async markDeliveryAsComplete(deliveryId: string, riderId: string): Promise<boolean> {
    const delivery = await this.deliveryModel.findOne({
      _id: deliveryId,
      riderId: new Types.ObjectId(riderId),
      deliverystatus: 'assigned',
    });
  
    if (!delivery) {
      return false; // Delivery not found or unauthorized
    }
  
    delivery.deliverystatus = 'delivered';
    await delivery.save();
    return true;
  }
  

  async getCompletedDeliveries(riderId: string) {
    return this.deliveryModel.find({
      riderId: new Types.ObjectId(riderId),
      deliverystatus: 'delivered', // Filter only delivered orders
    });
  }
  

  async getUserDeliveries(userObjectId) {
    console.log("Fetching deliveries for user with ID:", userObjectId);
  
    try {
      // Convert userObjectId to string if it's an ObjectId
      const userIdString = userObjectId instanceof ObjectId ? userObjectId.toString() : userObjectId;
  
      // Query deliveries for the specific user with the 'pending' or 'assigned' status
      const deliveries = await this.deliveryModel.find({
        userId: userIdString,  // Match userId as a string
        deliverystatus: { $in: ['pending', 'assigned'] }  // Filter by 'pending' or 'assigned' status
      }).exec();  // Use .exec() to execute the query
  
      console.log("Deliveries found:", deliveries);
      return deliveries;
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      throw new Error("Failed to fetch deliveries");
    }
  }
  

}

