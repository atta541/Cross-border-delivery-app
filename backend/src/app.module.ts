import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/product.module';
import { BasketModule } from './basket/basket.module';
import { PaymentModule } from './payment/payment.module';
import { FavouriteModule } from './favourite/favourite.module';
import { VerificationModule } from './verification/verification.module';
import { RiderTrackingModule } from './rider-tracking/rider-tracking.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import config from './config/config'; 
import { NotificationsModule } from './notifications/Notifications.module';
import { LocationGateway } from './websockets/rider-location-websocket/location.gateway';
import { OrdersModule } from './orders/orders.module';
import { EventsModule } from './events/events.module';
import { ReferralModule } from './referral/referral.module';
import { OccasionModule } from './occasion/occasion.module';
import { WebscrapperModule } from './webscrapper/webscrapper.module';
import { MessagesModule } from './messages/messages.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ChatBasketModule } from './chat-basket/chat-basket.module';
@Module({
  imports: [
    ConfigModule.forRoot({load: [config],
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const environment = configService.get<string>('NODE_ENV') || 'development';
        const uri = configService.get<string>(`MONGODB_URI_${environment.toUpperCase()}`);
        if (!uri) {
          console.error(`MongoDB URI for ${environment} environment is not defined`);
          throw new Error(`MongoDB URI for ${environment} environment is not defined`);
        }
        console.log(`Connecting to MongoDB URI: ${uri}`);
        return { uri };
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    UserModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    BasketModule,
    PaymentModule,
    FavouriteModule,
    VerificationModule,
    RiderTrackingModule,
    NotificationsModule,
    OrdersModule,
    EventsModule,
    ReferralModule,
    OccasionModule,
    WebscrapperModule,
    MessagesModule,
    PurchasesModule,
    ChatBasketModule,
  ],
  controllers: [AppController, NotificationsController,],
  providers: [AppService, NotificationsService,LocationGateway,],
})
export class AppModule {}
