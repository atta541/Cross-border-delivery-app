import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketService } from './basket.service';
import { CartController } from './basket.controller';
import { BasketItem, BasketItemSchema } from './schemas/basket.schema';
import { User, UserSchema } from '@src/auth/schemas/user.schema';
import { ProductsModule } from '@src/products/product.module';
import { ScheduleModule } from '@nestjs/schedule'; 
import { PaymentModule } from '../payment/payment.module';
import { channel } from 'diagnostics_channel';
import { ChatBasketModule } from '@src/chat-basket/chat-basket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BasketItem.name, schema: BasketItemSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProductsModule,
    ScheduleModule.forRoot(), 
    PaymentModule,
    ChatBasketModule
  ],
  controllers: [CartController],
  providers: [BasketService],
})
export class BasketModule {}
