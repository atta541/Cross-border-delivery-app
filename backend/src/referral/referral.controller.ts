import { Controller, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ReferralService } from './referral.service';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  // Genertate the Referral Code
  @Post('generate/:userId')
  async generateReferralCode(@Param('userId') userId: string) {
    try {
      const referralCode = await this.referralService.generateReferralCode(userId);
      return { message: 'Referral code generated successfully', referralCode };
    } catch (error) {
      console.error('Error generating referral code:', error);
      throw new HttpException('Failed to generate referral code', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Use the Referral Code here useerid will be of new user who is signing up the referral will be tracked by referralcode
  @Post('use/:userId/:referralCode')
  async useReferralCode(
    @Param('userId') userId: string,
    @Param('referralCode') referralCode: string,
  ) {
    try {
      const result = await this.referralService.handleReferral(userId, referralCode);
      return result;
    } catch (error) {
      console.error('Error using referral code:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // Reward the referrer when new user done any perchase or spend money the refferer will be rewarded in points
  @Post('reward/:newUserId')
  async rewardReferrer(@Param('newUserId') newUserId: string) {
    try {
      const result = await this.referralService.rewardReferrer(newUserId);
      return result;
    } catch (error) {
      console.error('Error rewarding referrer:', error);
      throw new HttpException('Failed to reward referrer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
