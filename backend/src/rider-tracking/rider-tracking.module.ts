import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiderTrackingService } from './rider-tracking.service';
import { RiderTrackingController } from './rider-tracking.controller';
import { Rider, RiderSchema } from './schemas/rider.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { NotificationsModule } from '../notifications/notifications.module'; 
import {LocationGateway} from '../websockets/rider-location-websocket/location.gateway';
import { Delivery, DeliverySchema } from '.././payment/schemas/delivery.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rider.name, schema: RiderSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }]),

    forwardRef(() => NotificationsModule), 
  ],
  controllers: [RiderTrackingController],
  providers: [RiderTrackingService,LocationGateway], 
  exports: [RiderTrackingService] 
  
})
export class RiderTrackingModule {}
