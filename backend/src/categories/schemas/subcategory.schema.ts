import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
