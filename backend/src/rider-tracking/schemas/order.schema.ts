import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum DeliveryStatus {
  PENDING = 'Pending',
  ON_THE_WAY = 'On the Way',
  ARRIVED = 'Arrived',
  COMPLETED = 'Completed',
}

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Rider', required: true })
  rider: Types.ObjectId; 

  @Prop({ required: true }) 
  deliveryLocation: [number, number];
  

  @Prop({ enum: DeliveryStatus, default: DeliveryStatus.PENDING })
  status: DeliveryStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
