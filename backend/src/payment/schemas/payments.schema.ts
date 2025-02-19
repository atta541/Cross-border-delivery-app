import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true }) // Enable automatic timestamps
export class Payment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  method: string;

  @Prop({ 
    required: true, 
    enum: ['pending', 'succeeded', 'failed', 'requires_payment_method', 'requires_confirmation'] 
  })
  status: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: false })
  invoice: string;

  @Prop({ required: true })
  paymentIntentId: string;

  @Prop() // Optional clientSecret property
  clientSecret?: string;

  @Prop({ type: Date, default: Date.now }) // Add explicit date field with a default value
  date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
