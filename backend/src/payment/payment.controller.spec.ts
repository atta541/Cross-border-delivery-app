import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment } from './schemas/payments.schema';

describe('PaymentService', () => {
  let service: PaymentService;
  let model: Model<Payment>;
  let stripeMock: any;

  const mockPaymentModel = {
    create: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    stripeMock = {
      customers: {
        create: jest.fn().mockResolvedValue({ id: 'customer_1' }),
      },
      paymentIntents: {
        create: jest.fn().mockResolvedValue({ id: 'pi_123', status: 'pending', invoice: 'inv_123' }),
        confirm: jest.fn().mockResolvedValue({ id: 'pi_123', status: 'succeeded' }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getModelToken(Payment.name),
          useValue: mockPaymentModel,
        },
      ],
    })
      .overrideProvider(Stripe)
      .useValue(stripeMock)
      .compile();

    service = module.get<PaymentService>(PaymentService);
    model = module.get<Model<Payment>>(getModelToken(Payment.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      const email = 'test@example.com';
      const userId = 'user_123';
      const result = await service.createCustomer(email, userId);

      expect(result).toEqual({ id: 'customer_1' });
      expect(stripeMock.customers.create).toHaveBeenCalledWith({
        email,
        metadata: { userId: 'user_123' },
      });
    });

    it('should throw a BadRequestException if creating a customer fails', async () => {
      stripeMock.customers.create.mockRejectedValue(new Error('Stripe error'));

      await expect(service.createCustomer('test@example.com', 'user_123')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent successfully', async () => {
      const paymentData = {
        userId: 'user_123',
        amount: 5000,
        currency: 'usd',
        email: 'test@example.com',
        name: 'John Doe',
        customerId: 'customer_1',
        productName: 'Product1',
      };

      await service.createPaymentIntent(
        paymentData.userId,
        paymentData.amount,
        paymentData.currency,
        paymentData.email,
        paymentData.name,
        paymentData.customerId,
        paymentData.productName,
      );

      expect(stripeMock.paymentIntents.create).toHaveBeenCalledWith({
        amount: paymentData.amount,
        currency: paymentData.currency,
        payment_method_types: ['card'],
      });

      expect(mockPaymentModel.create).toHaveBeenCalledWith({
        ...paymentData,
        paymentIntentId: 'pi_123',
        status: 'pending',
        invoice: 'inv_123',
      });
    });

    it('should throw a BadRequestException if payment method or customer ID is missing', async () => {
      const invalidData = {
        userId: 'user_123',
        amount: 5000,
        currency: 'usd',
        email: 'test@example.com',
        name: 'John Doe',
        customerId: '', // Missing customerId
        productName: 'Product1',
      };

      await expect(
        service.createPaymentIntent(
          invalidData.userId,
          invalidData.amount,
          invalidData.currency,
          invalidData.email,
          invalidData.name,
          invalidData.customerId,
          invalidData.productName,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('confirmPayment', () => {
    it('should confirm the payment successfully', async () => {
      const paymentIntentId = 'pi_123';

      const result = await service.confirmPayment(paymentIntentId);

      expect(result).toEqual({ id: paymentIntentId, status: 'succeeded' });
      expect(stripeMock.paymentIntents.confirm).toHaveBeenCalledWith(paymentIntentId, {
        payment_method: 'pm_card_visa',
      });
      expect(mockPaymentModel.updateOne).toHaveBeenCalledWith(
        { paymentIntentId },
        { status: 'succeeded' },
      );
    });

    it('should throw a BadRequestException if payment confirmation fails', async () => {
      stripeMock.paymentIntents.confirm.mockRejectedValue(new Error('Stripe error'));

      await expect(service.confirmPayment('pi_invalid')).rejects.toThrow(BadRequestException);
    });
  });
});
