import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rider extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [Number], default: [0, 0] }) 
  location: [number, number];

  @Prop({ default: Date.now })
  lastUpdated: Date;


  @Prop()
  customerFcmToken: string; // Define customer FCM token here
}

export const RiderSchema = SchemaFactory.createForClass(Rider);
