import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BasketItem } from './schemas/basket.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { User, UserDocument } from '@src/auth/schemas/user.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentService } from '../payment/payment.service';


@Injectable()
export class BasketService {
  constructor(
    @InjectModel(BasketItem.name) private readonly basketItemModel: Model<BasketItem>,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,

    private readonly paymentsService: PaymentService,

  ) { }


  async addToBasket(userId: string, productId: string, quantity: number) {
    
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const product = await this.productModel.findById(productId);
    
    if (!product) {
      throw new NotFoundException('Product not found');

    }

    if (product.quantity < quantity) {
      throw new NotFoundException('Not enough product in stock');
    }

    const existingItem = await this.basketItemModel.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subTotalPrice = existingItem.quantity * product.price;
      existingItem.isReserved = true;
      await existingItem.save();
      return existingItem;
    }

    const newBasketItem = await this.basketItemModel.create({
      userId: new Types.ObjectId(userId),
      productId: new Types.ObjectId(productId),
      quantity,
      price: product.price,
      subTotalPrice: quantity * product.price,
      isReserved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return newBasketItem;
  }


  async getCartItems(userId: string): Promise<BasketItem[]> {
    return this.basketItemModel.find({ userId }).exec();
  }

  async updateBasketItem(userId: string, productId: string, quantity: number) {

    const objectIdUserId = new Types.ObjectId(userId);
    const objectIdProductId = new Types.ObjectId(productId);

    const basketItem = await this.basketItemModel.findOne({
      userId: objectIdUserId,
      productId: objectIdProductId,
    });
    if (!basketItem) {
      throw new NotFoundException('Product not found in basket');
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const quantityDifference = quantity - basketItem.quantity;
    if (product.quantity < quantityDifference) {
      throw new BadRequestException('Not enough product in stock for the update');
    }

    basketItem.quantity = quantity;
    basketItem.subTotalPrice = quantity * product.price;
    await basketItem.save();

    return basketItem;
  }

  async removeBasketItem(userId: string, productId: string) {
    const objectIdUserId = new Types.ObjectId(userId);
    const objectIdProductId = new Types.ObjectId(productId);

    const basketItem = await this.basketItemModel.findOne({
      userId: objectIdUserId,
      productId: objectIdProductId,
    });

    if (!basketItem) {
      throw new NotFoundException('Product not found in basket');
    }

    return this.basketItemModel.deleteOne({ _id: basketItem._id });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async clearAbandonedItems() {
    // console.log('Clearing abandoned items');
    const expirationTime = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago
    const expiredItems = await this.basketItemModel.find({
      updatedAt: { $lt: expirationTime },
      isReserved: true,
    });

    for (const item of expiredItems) {
      await this.basketItemModel.deleteOne({ _id: item._id });
    }

  }

  //stagr 2
  async completeCheckout(userId: string, productId: string, quantity: number) {
    const userObjectId = new Types.ObjectId(userId);
    const productObjectId = new Types.ObjectId(productId);

    const basketItem = await this.basketItemModel.findOne({ userId: userObjectId, productId: productObjectId });
    if (!basketItem || !basketItem.isReserved) {
      throw new NotFoundException('Item not found or not reserved');
    }

    const product = await this.productModel.findById(productObjectId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.quantity < quantity) {
      throw new NotFoundException('Not enough stock to complete the order');
    }

    product.quantity -= quantity;
    await product.save();

    basketItem.isReserved = false;
    await basketItem.save();

    const amount = basketItem.subTotalPrice * 100;
    const productName = product.name;

    let customerId;
    const user = await this.userModel.findById(userObjectId);

    if (user && user.stripeCustomerId) {
      customerId = user.stripeCustomerId;
    } else {
      const customer = await this.paymentsService.createCustomer(user.email, userId);
      customerId = customer.id;

      user.stripeCustomerId = customerId;
      await user.save();
    }


    const email = user.email;
    const name = `${user.first_name} ${user.last_name}`;
    const stripeId = user.stripeCustomerId;

    const paymentIntent = await this.paymentsService.createPaymentIntent(userId, amount, 'usd', email, name, stripeId, productName);

    await this.basketItemModel.deleteOne({ _id: basketItem._id });
    return {
      message: 'Checkout completed, stock updated, payment initiated',
      paymentIntent
    };
  }

  // async handleCustomCheckout(userId: string, quantity: number, ) {
  //   console.log("custom checkout hitting")
  //   const defaultPrice = 10;  // Define a default price for custom items
    
  //   const totalAmount = defaultPrice * quantity;
  //   console.log("total amount: " + totalAmount)
    
  //   // Proceed with charging the user as in the previous logic
  //   const userObjectId = new Types.ObjectId(userId);
  //   const user = await this.userModel.findById(userObjectId);
  
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  
  //   let customerId = user.stripeCustomerId;
  //   if (!customerId) {
  //     const customer = await this.paymentsService.createCustomer(user.email, userId);
  //     customerId = customer.id;
  //     user.stripeCustomerId = customerId;
  //     await user.save();
  //   }
  
  //   const paymentIntent = await this.paymentsService.createPaymentIntent(
  //     userId,
  //     totalAmount * 100,  // Convert to cents for Stripe
  //     'usd',
  //     user.email,
  //     `${user.first_name} ${user.last_name}`,
  //     customerId,
  //     'Custom Item'
  //     // Productname
  //   );
  
  //   return {
  //     message: 'Checkout completed for custom item',
  //     paymentIntent
  //   };
  // }
  
  async handleCustomCheckout(userId: string) {
    console.log("Custom checkout hitting");
  
    // Step 1: Retrieve basket items for the user with ProductType: "chat"
    const userObjectId = new Types.ObjectId(userId);
    const basketItems = await this.basketItemModel.find({
      userId: userObjectId,
      ProductType: "chat",
    });
  
    if (!basketItems || basketItems.length === 0) {
      throw new NotFoundException("No items found in the basket with ProductType: 'chat'");
    }
  
    // Step 2: Calculate total amount and prepare payment details
    let totalAmount = 0;
    const itemNames = basketItems.map((item) => {
      totalAmount += item.price * item.quantity; // Calculate total amount
      return item.name;
    });
    
    console.log("Total amount: " + totalAmount);
  
    // Step 3: Get user and Stripe customer details
    const user = await this.userModel.findById(userObjectId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.paymentsService.createCustomer(user.email, userId);
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }
  
    // Step 4: Create payment intent
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      userId,
      // totalAmount * 100, // Convert to cents for Stripe
      Math.round(totalAmount * 100), // Ensure the amount is an integer (in cents)

      "usd",
      user.email,
      `${user.first_name} ${user.last_name}`,
      customerId,
      itemNames.join(", ") // Join item names as a description
    );
  
    // Step 5: Delete processed basket items
    const basketItemIds = basketItems.map((item) => item._id);
    await this.basketItemModel.deleteMany({ _id: { $in: basketItemIds } });
  
    return {
      message: "Checkout completed for custom items",
      paymentIntent,
    };
  }
  
}