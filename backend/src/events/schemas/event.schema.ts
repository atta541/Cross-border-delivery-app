import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true, enum: ['Islamic', 'Christian', 'National', 'Other'] })
  eventType: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  description?: string;

  @Prop({ default: false })
  recurring: boolean;

  @Prop({ required: true, enum: ['Islam', 'Christianity', 'None'] })
  religion: string;

  @Prop({ default: 'Pakistan' })
  country: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
