import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './schemas/purchases.schema';
import { LoggerModule } from '../logger/logger.module'; // Import LoggerModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }]),
    LoggerModule, // Add LoggerModule here
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
