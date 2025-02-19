import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteService } from './favourite.service';
import { getModelToken } from '@nestjs/mongoose';
import { Favourite } from './schemas/favourite.schema';
import { Product } from '../products/schemas/product.schema';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('FavouriteService', () => {
  let service: FavouriteService;
  let favouriteModel: any;
  let productModel: any;

  const mockFavouriteModel = {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    create: jest.fn(), // Ensure create method is available
  };

  const mockProductModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavouriteService,
        {
          provide: getModelToken(Favourite.name),
          useValue: mockFavouriteModel,
        },
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<FavouriteService>(FavouriteService);
    favouriteModel = module.get(getModelToken(Favourite.name));
    productModel = module.get(getModelToken(Product.name));
  });

  describe('createFavourite', () => {
    it('should create a favourite successfully', async () => {
      const userId = new Types.ObjectId(); // Use ObjectId for userId
      const productId = new Types.ObjectId(); // Use ObjectId for productId
      const productExists = { _id: productId };

      productModel.findById.mockResolvedValue(productExists);
      favouriteModel.findOne.mockResolvedValue(null);
      favouriteModel.create.mockResolvedValue({ userId, productId }); // Mock create

      const result = await service.createFavourite(userId.toString(), productId.toString());
      expect(result).toEqual({ userId, productId });
      expect(productModel.findById).toHaveBeenCalledWith(productId);
      expect(favouriteModel.findOne).toHaveBeenCalledWith({ userId, productId });
      expect(favouriteModel.create).toHaveBeenCalledWith({ userId, productId }); // Check if create was called
    });

    it('should throw NotFoundException if product does not exist', async () => {
      const userId = 'userId123';
      const productId = 'productId123';

      productModel.findById.mockResolvedValue(null);

      await expect(service.createFavourite(userId, productId)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if favourite already exists', async () => {
      const userId = 'userId123';
      const productId = 'productId123';
      const productExists = { _id: productId };
      const existingFavourite = { userId, productId };

      productModel.findById.mockResolvedValue(productExists);
      favouriteModel.findOne.mockResolvedValue(existingFavourite);

      await expect(service.createFavourite(userId, productId)).rejects.toThrow(ConflictException);
    });
  });


  describe('removeFavourite', () => {
    it('should remove a favourite successfully', async () => {
      const id = 'favouriteId123';
      favouriteModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

      await service.removeFavourite(id);
      expect(favouriteModel.deleteOne).toHaveBeenCalledWith({ _id: id });
    });

    it('should throw NotFoundException if favourite not found', async () => {
      const id = 'favouriteId123';
      favouriteModel.deleteOne.mockResolvedValue({ deletedCount: 0 });

      await expect(service.removeFavourite(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFavouritesByUser', () => {
    it('should return favourites for a user', async () => {
      const userId = 'userId123';
      const favourites = [{ userId, productId: 'productId123' }];

      favouriteModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(favourites), // Mock populate here
      });

      const result = await service.getFavouritesByUser(userId);
      expect(result).toEqual(favourites);
      expect(favouriteModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('isProductFavourite', () => {
    it('should return true if product is a favourite', async () => {
      const userId = 'userId123';
      const productId = 'productId123';
      const favourite = { userId, productId };

      favouriteModel.findOne.mockResolvedValue(favourite);

      const result = await service.isProductFavourite(userId, productId);
      expect(result).toBe(true);
    });

    it('should return false if product is not a favourite', async () => {
      const userId = 'userId123';
      const productId = 'productId123';

      favouriteModel.findOne.mockResolvedValue(null);

      const result = await service.isProductFavourite(userId, productId);
      expect(result).toBe(false);
    });
  });
});
