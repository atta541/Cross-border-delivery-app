import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guards';
import { Role } from '../auth/enums/role.enum';
import { Favourite } from './schemas/favourite.schema';
import { Types } from 'mongoose'; // Add this import for ObjectId

describe('FavouriteController', () => {
  let controller: FavouriteController;
  let service: FavouriteService;

  const mockFavouriteService = {
    createFavourite: jest.fn(),
    removeFavourite: jest.fn(),
    getFavouritesByUser: jest.fn(),
    isProductFavourite: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavouriteController],
      providers: [
        {
          provide: FavouriteService,
          useValue: mockFavouriteService,
        },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true }) // Mock AuthGuard
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: () => true }) // Mock RolesGuard
    .compile();

    controller = module.get<FavouriteController>(FavouriteController);
    service = module.get<FavouriteService>(FavouriteService);
  });


  describe('addFavourite', () => {
    it('should add a favourite successfully', async () => {
      const userId = new Types.ObjectId(); // Use ObjectId for userId
      const productId = new Types.ObjectId(); // Use ObjectId for productId
      const result: Favourite = { userId, productId } as Favourite;

      mockFavouriteService.createFavourite.mockResolvedValue(result);

      const req = { user: { id: userId.toString() } }; 

      expect(await controller.addFavourite(req, productId.toString())).toBe(result);
      expect(mockFavouriteService.createFavourite).toHaveBeenCalledWith(userId.toString(), productId.toString());
    });
  });

  describe('removeFavourite', () => {
    it('should remove a favourite successfully', async () => {
      const id = 'favouriteId123';
      mockFavouriteService.removeFavourite.mockResolvedValue(undefined);

      expect(await controller.removeFavourite(id)).toEqual({ message: 'Favourite removed successfully' });
      expect(mockFavouriteService.removeFavourite).toHaveBeenCalledWith(id);
    });
  });

  describe('getFavouritesByUser', () => {
    it('should return favourites for a user', async () => {
      const userId = new Types.ObjectId(); // Use ObjectId for userId
      const result: Favourite[] = [{ userId, productId: new Types.ObjectId() }] as Favourite[];

      mockFavouriteService.getFavouritesByUser.mockResolvedValue(result);

      // Mock the request object
      const req = { user: { id: userId.toString() } };

      expect(await controller.getFavouritesByUser(req)).toBe(result);
      expect(mockFavouriteService.getFavouritesByUser).toHaveBeenCalledWith(userId.toString());
    });
  });

  describe('isProductFavourite', () => {
    it('should return true if product is a favourite', async () => {
      const userId = 'userId123';
      const productId = 'productId123';
      mockFavouriteService.isProductFavourite.mockResolvedValue(true);

      const req = { user: { id: userId } }; // Mock the request object

      expect(await controller.isProductFavourite(req, productId)).toBe(true);
      expect(mockFavouriteService.isProductFavourite).toHaveBeenCalledWith(userId, productId);
    });
  });
});
