import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OccasionDocument = Occasion & Document;

@Schema()
export class Occasion {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  person: string; // E.g., 'Mother', 'Wife', etc.

  @Prop({ required: true })
  occasionType: string; // E.g., 'Birthday', 'Anniversary', etc.

  @Prop({ required: true })
  date: Date; // Date of the occasion

  @Prop({ default: Date.now })
  createdAt: Date; // To track when the occasion was added
}

export const OccasionSchema = SchemaFactory.createForClass(Occasion);
