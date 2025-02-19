import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from './basket.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BasketItem } from './schemas/basket.schema';
import { Product } from '../products/schemas/product.schema';
import { User } from '@src/auth/schemas/user.schema';
import { PaymentService } from '../payment/payment.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BasketService', () => {
  let service: BasketService;
  let basketItemModel: Model<BasketItem>;
  let productModel: Model<Product>;
  let userModel: Model<User>;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const mockBasketItemModel = {
      findOne: jest.fn(),
      deleteOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        {
          provide: getModelToken(BasketItem.name),
          useValue: mockBasketItemModel,
        },
        {
          provide: getModelToken(Product.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            createCustomer: jest.fn(),
            createPaymentIntent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BasketService>(BasketService);
    basketItemModel = module.get<Model<BasketItem>>(getModelToken(BasketItem.name));
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addToBasket', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(service.addToBasket(new Types.ObjectId().toString(), new Types.ObjectId().toString(), 1))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue({} as any);
      jest.spyOn(productModel, 'findById').mockResolvedValue(null);

      await expect(service.addToBasket(new Types.ObjectId().toString(), new Types.ObjectId().toString(), 1))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if not enough product in stock', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue({} as any);
      jest.spyOn(productModel, 'findById').mockResolvedValue({ quantity: 0 } as any);

      await expect(service.addToBasket(new Types.ObjectId().toString(), new Types.ObjectId().toString(), 1))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should add new item to basket', async () => {
      const validUserId = new Types.ObjectId();
      const validProductId = new Types.ObjectId();
      const mockProduct = { _id: validProductId, price: 100, quantity: 10 };

      jest.spyOn(userModel, 'findById').mockResolvedValue({} as any);
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct as any);
      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(basketItemModel, 'create').mockResolvedValue({
        userId: validUserId,
        productId: validProductId,
        quantity: 1,
        price: 100,
        subTotalPrice: 100,
        isReserved: true,
      } as any);

      const result = await service.addToBasket(validUserId.toString(), validProductId.toString(), 1);
      expect(result.subTotalPrice).toBe(100);
      expect(result.isReserved).toBe(true);
    });

    it('should update existing item in basket', async () => {
      const validUserId = new Types.ObjectId();
      const validProductId = new Types.ObjectId();
      const mockProduct = { _id: validProductId, price: 100, quantity: 10 };
      const existingItem = {
        userId: validUserId,
        productId: validProductId,
        quantity: 1,
        price: 100,
        subTotalPrice: 100,
        isReserved: true,
        save: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(userModel, 'findById').mockResolvedValue({} as any);
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct as any);
      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(existingItem);

      const result = await service.addToBasket(validUserId.toString(), validProductId.toString(), 1);
      expect(existingItem.save).toHaveBeenCalled();
      expect(result.subTotalPrice).toBe(200);
    });
  });

  describe('updateBasketItem', () => {
    it('should throw NotFoundException if basket item is not found', async () => {
      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(null);

      await expect(service.updateBasketItem(new Types.ObjectId().toString(), new Types.ObjectId().toString(), 2))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const mockBasketItem = {
        userId: new Types.ObjectId(),
        productId: new Types.ObjectId(),
        quantity: 1,
        price: 100,
        subTotalPrice: 100,
      };

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem);
      jest.spyOn(productModel, 'findById').mockResolvedValue(null);

      await expect(service.updateBasketItem(mockBasketItem.userId.toString(), mockBasketItem.productId.toString(), 2))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw BadRequestException if not enough stock for the update', async () => {
      const mockBasketItem = {
        userId: new Types.ObjectId(),
        productId: new Types.ObjectId(),
        quantity: 1,
        price: 100,
        subTotalPrice: 100,
      };

      const mockProduct = { _id: mockBasketItem.productId, price: 100, quantity: 1 };

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem);
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct);

      await expect(service.updateBasketItem(mockBasketItem.userId.toString(), mockBasketItem.productId.toString(), 3))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should update the basket item quantity and return the updated basket item', async () => {
      const mockBasketItem = {
        userId: new Types.ObjectId(),
        productId: new Types.ObjectId(),
        quantity: 1,
        price: 100,
        subTotalPrice: 100,
        save: jest.fn().mockResolvedValue(true),
      };

      const mockProduct = { _id: mockBasketItem.productId, price: 100, quantity: 10 };

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem);
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct);

      const result = await service.updateBasketItem(mockBasketItem.userId.toString(), mockBasketItem.productId.toString(), 2);

      expect(mockBasketItem.save).toHaveBeenCalled();
      expect(result.quantity).toBe(2);
      expect(result.subTotalPrice).toBe(200);
    });
  });


  describe('removeBasketItem', () => {
    it('should remove item from basket', async () => {
      const mockBasketItem = { _id: 'itemId' };
      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem as any);
      jest.spyOn(basketItemModel, 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any);

      const result = await service.removeBasketItem(new Types.ObjectId().toString(), new Types.ObjectId().toString());
      expect(result.deletedCount).toBe(1);
    });

    it('should throw NotFoundException if product not in basket', async () => {
      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(null);

      await expect(service.removeBasketItem(new Types.ObjectId().toString(), new Types.ObjectId().toString()))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('completeCheckout', () => {
    it('should throw NotFoundException if basket item is not found or not reserved', async () => {
      const userId = new Types.ObjectId().toString();
      const productId = new Types.ObjectId().toString();

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(null); // No basket item found

      await expect(service.completeCheckout(userId, productId, 1))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const userId = new Types.ObjectId().toString();
      const productId = new Types.ObjectId().toString();

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue({ isReserved: true });
      jest.spyOn(productModel, 'findById').mockResolvedValue(null); // No product found

      await expect(service.completeCheckout(userId, productId, 1))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw NotFoundException if not enough stock to complete the order', async () => {
      const userId = new Types.ObjectId().toString();
      const productId = new Types.ObjectId().toString();
      const quantity = 5;

      const mockBasketItem = { isReserved: true, subTotalPrice: 100 };

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem);
      jest.spyOn(productModel, 'findById').mockResolvedValue({ quantity: 3 }); // Not enough stock

      await expect(service.completeCheckout(userId, productId, quantity))
        .rejects
        .toThrow(NotFoundException);
    });



    it('should complete checkout successfully', async () => {
      const userId = new Types.ObjectId().toString();
      const productId = new Types.ObjectId().toString();
      const quantity = 1;

      const mockUser = {
        _id: userId,
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        stripeCustomerId: null,
        save: jest.fn().mockResolvedValue(true)
      };

      const mockProduct = {
        _id: productId,
        name: 'Sample Product',
        quantity: 10,
        save: jest.fn().mockResolvedValue(true)
      };

      const mockBasketItem = {
        isReserved: true,
        subTotalPrice: 100,
        _id: new Types.ObjectId(),
        save: jest.fn().mockResolvedValue(true)
      };

      const mockCustomer = {
        id: 'customer_id',
        object: 'customer',
        balance: 0,
        created: 1610000000,
        default_source: null,
      };

      const mockPaymentIntent = {
        id: 'payment_intent_id',
        object: 'payment_intent',
        amount: 10000,
        currency: 'usd',
      };

      jest.spyOn(basketItemModel, 'findOne').mockResolvedValue(mockBasketItem);
      jest.spyOn(productModel, 'findById').mockResolvedValue(mockProduct);
      jest.spyOn(basketItemModel, 'deleteOne').mockResolvedValue({ acknowledged: true, deletedCount: 1 } as any);

      jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser); // Mock user model's findById method
      jest.spyOn(paymentService, 'createCustomer').mockResolvedValue(mockCustomer as any);
      jest.spyOn(paymentService, 'createPaymentIntent').mockResolvedValue(mockPaymentIntent as any);

      const result = await service.completeCheckout(userId, productId, quantity);

      expect(result).toEqual({
        message: 'Checkout completed, stock updated, payment initiated',
        paymentIntent: mockPaymentIntent,
      });
      expect(mockProduct.quantity).toBe(9);
      expect(basketItemModel.deleteOne).toHaveBeenCalledWith({ _id: mockBasketItem._id });
    });

  });

});


