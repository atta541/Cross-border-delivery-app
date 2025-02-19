import { Injectable, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as Twilio from 'twilio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Verification, VerificationDocument } from '../schemas/verification.schema';

@Injectable()
export class SmsService {
  private twilioClient: Twilio.Twilio;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Verification.name)
    private verificationModel: Model<VerificationDocument>,
  ) {
    this.twilioClient = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSMS(phoneNumber: string, message: string) {
    try {
      console.log(`Sending SMS to ${phoneNumber}: ${message}`);
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new InternalServerErrorException('Failed to send SMS');
    }
  }

  // Updated verifyPhone to use Verification schema
  async verifyPhone(phone: string, code: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ phone }).populate('verification');
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verification = await this.verificationModel.findById(user.verification);
    if (!verification) {
      throw new BadRequestException('Verification details not found');
    }

    if (verification.phoneVerificationCode === code) {
      verification.isPhoneVerified = true;
      verification.phoneVerificationCode = null;
      await verification.save();
      return { message: 'Phone number verified successfully' };
    } else {
      throw new UnauthorizedException('Invalid verification code');
    }
  }









  // Updated resendVerification to use Verification schema
  async resendVerification(phone: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ phone }).populate('verification');
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verification = await this.verificationModel.findById(user.verification);
    if (!verification) {
      throw new BadRequestException('Verification details not found');
    }

    if (verification.isPhoneVerified) {
      throw new BadRequestException('Phone number is already verified');
    }

    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verification.phoneVerificationCode = phoneVerificationCode;
    await verification.save();

    await this.sendSMS(phone, `Your verification code is ${phoneVerificationCode}`);

    return { message: 'Verification code resent successfully' };
  }
}
