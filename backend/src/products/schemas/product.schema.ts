// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type ProductDocument = Product & Document;

// @Schema()
// export class Product {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true })
//   productId: string;

//   @Prop({ required: true })
//   description: string;

//   @Prop()
//   specification?: string;

//   @Prop()
//   additionalInfo?: string;

//   @Prop({ required: true })
//   price: number;

//   @Prop({ required: true })
//   quantity: number;

//   @Prop([String])
//   deliverableCities: string[];

//   @Prop({ type: Types.ObjectId, ref: 'Subcategory', required: true })
//   subcategoryId: Types.ObjectId;
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);




import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  productId: string;

  @Prop({ required: false })
  description: string;

  @Prop()
  specification?: string;

  @Prop()
  additionalInfo?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop([String])
  deliverableCities: string[];

  @Prop({ type: Types.ObjectId, ref: 'Subcategory', required: false })
  subcategoryId: Types.ObjectId;

  @Prop({ required: false }) // New field for product URL
  productUrl: string;

  @Prop({ required: false }) // New field for primary image URL
  primaryImageUrl: string;

  @Prop({ required: false }) // New field for secondary image URL
  secondaryImageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
