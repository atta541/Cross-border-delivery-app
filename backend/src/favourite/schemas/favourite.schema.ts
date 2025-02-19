import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavouriteDocument = Favourite & Document;

@Schema({ timestamps: true }) // This adds `createdAt` and `updatedAt` fields automatically
export class Favourite {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' }) // Assuming you have a Product schema
  productId: Types.ObjectId;
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
