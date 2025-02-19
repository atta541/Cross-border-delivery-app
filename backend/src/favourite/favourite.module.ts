import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { Favourite, FavouriteSchema } from './schemas/favourite.schema';
import { ProductsModule } from '../products/product.module'; // Ensure the correct import path

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favourite.name, schema: FavouriteSchema }]),
    ProductsModule, // Import the ProductsModule
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
