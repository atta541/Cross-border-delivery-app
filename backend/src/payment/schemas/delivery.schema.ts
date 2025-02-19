import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Delivery extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  riderId: Types.ObjectId;

  // @Prop({ type: [String, Types.ObjectId], ref: 'User', default: null })
  // riderId: string | Types.ObjectId;


  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 'pending' })
  deliverystatus: string;

  @Prop({ default: Date.now })
  deliveryDate: Date;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
