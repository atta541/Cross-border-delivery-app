import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favourite, FavouriteDocument } from './schemas/favourite.schema';
import { Product } from '../products/schemas/product.schema'; // Import your Product schema

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite.name) private favouriteModel: Model<FavouriteDocument>,
    @InjectModel(Product.name) private productModel: Model<Product>, // Inject the Product model
  ) {}

  async createFavourite(userId: string, productId: string): Promise<Favourite> {
    const productExists = await this.productModel.findById(productId);
    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    // Check if the product is already a favourite for the user
    const existingFavourite = await this.favouriteModel.findOne({ userId, productId });
    if (existingFavourite) {
      throw new ConflictException('Product is already in favourites');
    }

    const newFavourite = new this.favouriteModel({ userId, productId });
    return await newFavourite.save();
  }

  async removeFavourite(id: string): Promise<void> {
    const result = await this.favouriteModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Favourite not found');
    }
  }

  async getFavouritesByUser(userId: string): Promise<Favourite[]> {
    return await this.favouriteModel.find({ userId }).populate('productId'); // Populating product details if needed
  }

  async isProductFavourite(userId: string, productId: string): Promise<boolean> {
    const favourite = await this.favouriteModel.findOne({ userId, productId });
    return favourite !== null;
  }

  // Add more methods for CRUD operations as needed
}
