import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Verification {

  @Prop({ type: Types.ObjectId, ref: 'User', required: false }) 
  user: Types.ObjectId;

  @Prop()
  verificationToken: string; 

  @Prop()
  phoneVerificationCode: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isPhoneVerified: boolean;
}

export type VerificationDocument = Verification & Document;
export const VerificationSchema = SchemaFactory.createForClass(Verification);
