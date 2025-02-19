import { Module } from '@nestjs/common';
import { ChatBasketController } from './chat-basket.controller';
import { ChatBasketService } from './chat-basket.service';
import { BasketModule } from '@src/basket/basket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketItem, BasketItemSchema } from '@src/basket/schemas/basket.schema';
import { UserModule } from '.././user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BasketItem.name, schema: BasketItemSchema }]),
    UserModule
  ],
  controllers: [ChatBasketController],
  providers: [ChatBasketService],
  exports: [ChatBasketService],


})
export class ChatBasketModule {}
