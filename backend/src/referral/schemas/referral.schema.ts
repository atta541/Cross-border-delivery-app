import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Referral extends Document {
  @Prop({ required: true, type: String, ref: 'User' })
  referrer: string;

  @Prop({ required: true, type: String, ref: 'User' })
  referredUser: string;

  @Prop({ default: false })
  isRewarded: boolean; // Has the referrer been rewarded?
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
