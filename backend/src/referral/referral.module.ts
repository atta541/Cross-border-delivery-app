import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { Referral, ReferralSchema } from './schemas/referral.schema';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Referral.name, schema: ReferralSchema }]),
    AuthModule, 
  ],
  providers: [ReferralService],
  controllers: [ReferralController],
})
export class ReferralModule {}
