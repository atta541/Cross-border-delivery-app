import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@src/auth/schemas/user.schema';
import { BasketItem } from '@src/basket/schemas/basket.schema';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import * as cheerio from 'cheerio';

@Injectable()
export class ChatBasketService {
  constructor(
    @InjectModel(BasketItem.name) private readonly basketItemModel: Model<BasketItem>,


    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,


  ) { }


  // async fetchMetadata(url: string) {
  //   try {
  //     const { data } = await axios.get(url);
  //     const $ = cheerio.load(data);

  //     const image = $('meta[property="og:image"]').attr('content');
  //     const price =
  //       $('meta[property="og:price:amount"]').attr('content') ||
  //       $('meta[name="price"]').attr('content') ||
  //       $('.price').text() ||
  //       null;
  //     const title = $('meta[property="og:title"]').attr('content');
  //     const description = $('meta[property="og:description"]').attr('content');


  //     console.log("log: " + "image: " + image, "price: " + price, "title: " + title, "description: " + description);

  //     return {
  //       image: image || null,
  //       price: price ? price.trim() : null,
  //       title: title || 'No title available',
  //       description: description || 'No description available',
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       'Failed to fetch metadata. Ensure the URL is valid.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }


  async fetchMetadata(url: string) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
  
      const image = $('meta[property*="image"]').attr('content');
      const price =
        $('meta[property*="price"]').attr('content') ||
        $('meta[name*="price"]').attr('content') ||
        $('.price').text() ||
        null;
      const currency =
        $('meta[property*="currency"]').attr('content') ||
        $('meta[name*="currency"]').attr('content') ||
        null;
      const title =
        $('meta[property*="title"]').attr('content') ||
        $('title').text();
      const description =
        $('meta[property*="description"]').attr('content') ||
        $('meta[name*="description"]').attr('content');
  
      console.log(
        "log:",
        "image:",
        image,
        "price:",
        price,
        "currency:",
        currency,
        "title:",
        title,
        "description:",
        description
      );
  
      return {
        image: image || null,
        price: price ? price.trim() : null,
        currency: currency || null,
        title: title || 'No title available',
        description: description || 'No description available',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch metadata. Ensure the URL is valid.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  



  // async addToBasket(userId: string, price: string | number, name: string, quantity: string) {
  //   const user = await this.userModel.findById(userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
  //   if (priceNumber <= 0) {
  //     throw new BadRequestException('Price must be greater than 0');
  //   }
  //   const newBasketItem = await this.basketItemModel.create({
  //     userId: new Types.ObjectId(userId),
  //     name,
  //     price: price,
  //     quantity: quantity,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   return newBasketItem;
  // }




  async addToBasket(userId: string, price: string | number, name: string, quantity: number, Image: string) { // Change `quantity` type to `number`
    console.log("nameeee" + name);
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
    if (priceNumber <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0'); // Add validation for quantity
    }

    // const ProductType="chat"
    const newBasketItem = await this.basketItemModel.create({
      userId: new Types.ObjectId(userId),
      ProductType: "chat",
      name: name,
      price: priceNumber, // Use parsed price
      quantity: quantity, // Ensure quantity is passed as a number
      image: Image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newBasketItem;
  }

}


