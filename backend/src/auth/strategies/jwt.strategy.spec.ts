import { JwtStrategy, JwtPayload } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;
  let userModel: Model<User>;

  const mockUserModel = {
    findById: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mockJwtSecret'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return a user object if validation is successful', async () => {
      const payload: JwtPayload = { sub: 'userId', email: 'test@example.com', roles: ['user'] };
      const mockUser = {
        _id: 'userId',
        email: 'test@example.com',
      };
      
      mockUserModel.findById.mockResolvedValue(mockUser);

      const result = await jwtStrategy.validate(payload);
      expect(result).toEqual({
        id: 'userId',
        email: 'test@example.com',
        roles: ['user'],
      });
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      const payload: JwtPayload = { sub: 'userId', email: 'test@example.com', roles: ['user'] };

      mockUserModel.findById.mockResolvedValue(null); // Simulating no user found

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(UnauthorizedException);
    });
  });
});
