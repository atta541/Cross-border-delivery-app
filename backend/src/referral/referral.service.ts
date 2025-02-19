import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Referral } from './schemas/referral.schema';

@Injectable()
export class ReferralService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Referral.name) private readonly referralModel: Model<Referral>,
  ) {}

  async generateReferralCode(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.ReferralCode) {
      return user.ReferralCode;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    user.ReferralCode = code;
    await user.save();

    return code;
  }

  async handleReferral(newUserId: string, referralCode: string) {
    const referrer = await this.userModel.findOne({ ReferralCode: referralCode });
    if (!referrer) {
      throw new Error('Invalid referral code');
    }

    const existingReferral = await this.referralModel.findOne({
      referrer: referrer._id,
      referredUser: newUserId,
    });
    if (existingReferral) {
      return { message: 'Referral already exists.' };
    }

    await this.referralModel.create({ referrer: referrer._id, referredUser: newUserId });
    await this.userModel.findByIdAndUpdate(newUserId, { referredBy: referrer._id });

    return { message: 'Referral successfully tracked.' };
  }

  async rewardReferrer(newUserId: string) {
    const referral = await this.referralModel.findOne({
      referredUser: newUserId,
      isRewarded: false,
    });
    if (!referral) {
      return { message: 'No reward applicable.' };
    }

    await this.userModel.findByIdAndUpdate(referral.referrer, {
      $inc: { rewardPoints: 10 },
    });

    referral.isRewarded = true;
    await referral.save();

    return { message: 'Referrer rewarded.' };
  }
}
