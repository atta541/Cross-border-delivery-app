import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Purchase extends Document {
  @Prop({ type: String, required: true })
  customerId: string; // Retrieved from JWT

  @Prop({ type: String, required: true })
  productId: string; // Reference to `products` table

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: String, required: true })
  status: string; // e.g., 'Pending', 'Assigned', 'Completed'

  @Prop({ type: String })
  assignedRiderId?: string; // Rider to whom the order is assigned
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
