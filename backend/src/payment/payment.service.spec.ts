import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment } from './schemas/payments.schema';
import { config } from 'dotenv';
config({ path: '.env.test' });


// Define the RequestWithUser type inline
type RequestWithUser = {
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        roles: string[];
    };
    // Include methods from Express's Request object
    get: (header: string) => string | undefined;
    header: (name: string) => string | undefined;
    accepts: (...types: string[]) => string | false;
    acceptsCharsets: (...charsets: string[]) => string | false;
    acceptsEncodings: (...encodings: string[]) => string | false;
    acceptsLanguages: (...languages: string[]) => string | false;
    is: (type: string) => string | false;
};

describe('PaymentService', () => {
    let service: PaymentService;
    let model: Model<Payment>;
    let stripeMock: any;

    const mockPaymentModel = {
        create: jest.fn(),
        updateOne: jest.fn(),
    };

    const mockRequestWithUser: RequestWithUser = {
        user: {
            id: 'user_123',
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe',
            roles: ['user'],
        },
        // Mock methods as needed
        get: jest.fn().mockReturnValue(null),
        header: jest.fn().mockReturnValue(null),
        accepts: jest.fn().mockReturnValue(null),
        acceptsCharsets: jest.fn().mockReturnValue(null),
        acceptsEncodings: jest.fn().mockReturnValue(null),
        acceptsLanguages: jest.fn().mockReturnValue(null),
        is: jest.fn().mockReturnValue(null),
    };

    // beforeEach(async () => {
    //     process.env.STRIPE_TEST_SECRET_KEY = 'sk_test_51PQQsWIJIsx7jmFZGSmKtlhhxQT0EkPhWcbVOiPHRtrOHfefIeQnQU5lM7vqVYqv99MCeKEizEvLhhTbbpzcyxjx00tLMFCtGG';

    //     console.log("Stripe Test Secret Key:", process.env.STRIPE_TEST_SECRET_KEY);

    //     stripeMock = {
    //         customers: {
    //             create: jest.fn().mockResolvedValue({ id: 'customer_1' }),
    //         },
    //         paymentIntents: {
    //             create: jest.fn().mockResolvedValue({ id: 'pi_123', status: 'pending', invoice: 'inv_123' }),
    //             confirm: jest.fn().mockResolvedValue({ id: 'pi_123', status: 'succeeded' }),
    //         },
    //     };

    //     const module: TestingModule = await Test.createTestingModule({
    //         providers: [
    //             PaymentService,
    //             {
    //                 provide: getModelToken(Payment.name),
    //                 useValue: mockPaymentModel,
    //             },
    //         ],
    //     })
    //         .overrideProvider(Stripe)
    //         .useValue(stripeMock)
    //         .compile();

    //     service = module.get<PaymentService>(PaymentService);
    //     model = module.get<Model<Payment>>(getModelToken(Payment.name));
    // });


    beforeEach(async () => {
        process.env.STRIPE_TEST_SECRET_KEY = 'sk_test_51PQQsWIJIsx7jmFZGSmKtlhhxQT0EkPhWcbVOiPHRtrOHfefIeQnQU5lM7vqVYqv99MCeKEizEvLhhTbbpzcyxjx00tLMFCtGG';
        
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
            {
              provide: Stripe,
              useValue: stripeMock,
            },
          ],
        }).compile();
      
        service = module.get<PaymentService>(PaymentService);
        model = module.get<Model<Payment>>(getModelToken(Payment.name));
      });
      
    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.STRIPE_TEST_SECRET_KEY; // Clean up the mocked variable
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createCustomer', () => {
        it('should create a customer successfully', async () => {
            const result = await service.createCustomer(mockRequestWithUser.user.email, mockRequestWithUser.user.id);

            expect(result).toEqual({ id: 'customer_1' });
            expect(stripeMock.customers.create).toHaveBeenCalledWith({
                email: mockRequestWithUser.user.email,
                metadata: { userId: mockRequestWithUser.user.id },
            });
        });

        it('should throw a BadRequestException if creating a customer fails', async () => {
            stripeMock.customers.create.mockRejectedValue(new Error('Stripe error'));

            await expect(service.createCustomer(mockRequestWithUser.user.email, mockRequestWithUser.user.id)).rejects.toThrow(
                BadRequestException,
            );
        });
    });

    describe('createPaymentIntent', () => {
        it('should create a payment intent successfully', async () => {
            const paymentData = {
                userId: mockRequestWithUser.user.id,
                amount: 5000,
                currency: 'usd',
                email: mockRequestWithUser.user.email,
                name: `${mockRequestWithUser.user.first_name} ${mockRequestWithUser.user.last_name}`,
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

        it('should throw a BadRequestException if required fields are missing', async () => {
            const invalidData = {
                userId: mockRequestWithUser.user.id,
                amount: 5000,
                currency: 'usd',
                email: mockRequestWithUser.user.email,
                name: `${mockRequestWithUser.user.first_name} ${mockRequestWithUser.user.last_name}`,
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
