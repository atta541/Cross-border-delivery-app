// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserService } from './user.service';
// import { User, UserSchema } from '../auth/schemas/user.schema';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
//   providers: [UserService],
//   exports: [UserService], // Export UserService for use in other modules
// })
// export class UserModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { LoggerModule } from '../logger/logger.module'; // Import LoggerModule
import { PaymentModule } from '@src/payment/payment.module';
import { Delivery, DeliverySchema } from '@src/payment/schemas/delivery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }]),
    
    LoggerModule, // Logger module for logging
    PaymentModule, // Import PaymentModule to use PaymentService
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,MongooseModule],
})
export class UserModule {}
