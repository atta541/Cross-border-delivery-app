import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BasketItemDocument = BasketItem & Document;

@Schema({ timestamps: true }) 
export class BasketItem {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: false, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  quantity: number;

  @Prop({ required: true })
  price: number; 

  @Prop({ required: false })
  subTotalPrice: number; 

  @Prop({ required: false })
  isReserved: boolean; 

  @Prop({ required: false })
  lastInteractedAt: Date;

  @Prop({ required: false })
  ProductType: string;

  @Prop({ required: false })
  image: string;
}

export const BasketItemSchema = SchemaFactory.createForClass(BasketItem);
