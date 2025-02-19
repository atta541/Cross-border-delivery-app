import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment, PaymentSchema } from './schemas/payments.schema';
import {  DeliverySchema } from './schemas/delivery.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]), 
    MongooseModule.forFeature([{ name: 'Delivery', schema: DeliverySchema }]), // Register the Delivery model

  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService], 

})
export class PaymentModule {}
