import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './basket.controller';
import { BasketService } from './basket.service';
import { AddBasketItemDto } from './dto/add-basket.dto';
import { UpdateBasketItemDto } from './dto/update-basket.dto';
import { RemoveBasketItemDto } from './dto/remove-basket.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { Role } from '../auth/enums/role.enum';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

describe('CartController', () => {
  let cartController: CartController;
  let basketService: BasketService;

  const mockBasketService = {
    addToBasket: jest.fn(),
    updateBasketItem: jest.fn(),
    removeBasketItem: jest.fn(),
    completeCheckout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: BasketService,
          useValue: mockBasketService,
        },
      ],
    }).compile();

    cartController = module.get<CartController>(CartController);
    basketService = module.get<BasketService>(BasketService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(cartController).toBeDefined();
  });

  describe('addCartItem', () => {
    it('should add items to the cart', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const addBasketItemDto: AddBasketItemDto = {
        items: [{ productId: 'product123', quantity: 2 }],
      };

      await cartController.addCartItem(addBasketItemDto, mockRequest);

      expect(mockBasketService.addToBasket).toHaveBeenCalledWith('user123', 'product123', 2);
    });

    it('should throw an error if adding to the cart fails', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const addBasketItemDto: AddBasketItemDto = {
        items: [{ productId: 'product123', quantity: 2 }],
      };

      mockBasketService.addToBasket.mockRejectedValueOnce(new NotFoundException('Product not found'));

      await expect(cartController.addCartItem(addBasketItemDto, mockRequest)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCartItem', () => {
    it('should update an item in the cart', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const updateBasketItemDto: UpdateBasketItemDto = { productId: 'product123', quantity: 3 };

      await cartController.updateCartItem(updateBasketItemDto, mockRequest);

      expect(mockBasketService.updateBasketItem).toHaveBeenCalledWith('user123', 'product123', 3);
    });

    it('should throw an error if updating the cart fails', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const updateBasketItemDto: UpdateBasketItemDto = { productId: 'product123', quantity: 3 };

      mockBasketService.updateBasketItem.mockRejectedValueOnce(new BadRequestException('Not enough stock'));

      await expect(cartController.updateCartItem(updateBasketItemDto, mockRequest)).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeCartItem', () => {
    it('should remove an item from the cart', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const removeBasketItemDto: RemoveBasketItemDto = { productId: 'product123' };

      await cartController.removeCartItem(removeBasketItemDto, mockRequest);

      expect(mockBasketService.removeBasketItem).toHaveBeenCalledWith('user123', 'product123');
    });

    it('should throw an error if removing from the cart fails', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const removeBasketItemDto: RemoveBasketItemDto = { productId: 'product123' };

      mockBasketService.removeBasketItem.mockRejectedValueOnce(new NotFoundException('Product not found in basket'));

      await expect(cartController.removeCartItem(removeBasketItemDto, mockRequest)).rejects.toThrow(NotFoundException);
    });
  });

  describe('completeCheckout', () => {
    it('should complete checkout for all items', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const checkoutDto: CheckoutDto = {
        items: [{ productId: 'product123', quantity: 1 }],
      };

      const mockResponse = { message: 'Checkout completed' };
      mockBasketService.completeCheckout.mockResolvedValueOnce(mockResponse);

      const result = await cartController.completeCheckout(checkoutDto, mockRequest);

      expect(result).toEqual({
        message: 'Checkout completed for all items',
        responses: [mockResponse],
      });
      expect(mockBasketService.completeCheckout).toHaveBeenCalledWith('user123', 'product123', 1);
    });

    it('should throw an error if checkout fails', async () => {
      const mockRequest = {
        user: { id: 'user123', email: 'test@example.com', roles: [Role.Client] },
      } as RequestWithUser;

      const checkoutDto: CheckoutDto = {
        items: [{ productId: 'product123', quantity: 1 }],
      };

      mockBasketService.completeCheckout.mockRejectedValueOnce(new NotFoundException('Item not found or not reserved'));

      await expect(cartController.completeCheckout(checkoutDto, mockRequest)).rejects.toThrow(NotFoundException);
    });
  });
});
