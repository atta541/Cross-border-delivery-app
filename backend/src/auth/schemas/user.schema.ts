import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../enums/role.enum';
import { Verification, VerificationSchema } from './verification.schema';

@Schema()
export class User {

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  facebookId: string;

  @Prop()
  provider: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  password: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.Client],
  })
  role: Role[];





  @Prop({ required: false })
  stripeCustomerId: string;



  @Prop({ required: false })
  FCMToken: string;

  @Prop({ type: Types.ObjectId, ref: 'Verification' })
  verification: Types.ObjectId;
  static first_name: any;

  @Prop({ unique: true })
  ReferralCode: string;


  @Prop({ default: 0 }) // Initialize with 0 if not set
  rewardPoints: number;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
