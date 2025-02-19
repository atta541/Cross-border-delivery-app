import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// Mock User Model
const mockUserModel: Partial<Model<User>> = {
  findOne: jest.fn(),
  create: jest.fn(),
};

// Mock ConfigService
const mockConfigService = {
  get: jest.fn((key: string) => {
    const config = {
      MAILTRAP_USER: 'test_user',
      MAILTRAP_PASSWORD: 'test_password',
      MAILTRAP_HOST: 'test_host',
      MAILTRAP_PORT: '587',
    };
    return config[key];
  }),
};

// Mock Nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true), // Mocking sendMail to return a resolved promise
  }),
}));

// Mock UUID function
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'), // Returning a mocked UUID value
}));

describe('EmailService', () => {
  let service: EmailService;
  let userModel: Model<User>;

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mocks

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification email', async () => {
      await service.sendVerificationEmail('test@example.com', 'mock-uuid');

      // Check sendMail method was called correctly
      expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expect.objectContaining({
        to: 'test@example.com',
        subject: 'Email Verification',
      }));
    });
  });

  describe('verifyEmail', () => {
    it('should verify a valid email', async () => {
      const mockUser = {
        isVerified: false,
        verificationToken: 'some-token',
        save: jest.fn().mockResolvedValue(true),
      };

      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.verifyEmail('some-token');

      expect(result).toEqual({ success: true, message: 'Email verified successfully' });
      expect(mockUser.isVerified).toBe(true);
      expect(mockUser.verificationToken).toBe(null);
    });

    it('should throw BadRequestException for invalid token', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.verifyEmail('invalid-token')).rejects.toThrow(BadRequestException);
    });
  });

  describe('resendEmailVerification', () => {
    it('should resend email verification', async () => {
      const mockUser = {
        email: 'test@example.com',
        isVerified: false,
        verificationToken: null,
        save: jest.fn().mockResolvedValue(true),
      };

      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.resendEmailVerification('test@example.com');

      expect(result).toEqual({ message: 'Verification email resent successfully' });
      expect(mockUser.verificationToken).toBe('mock-uuid'); // Ensure the UUID is set
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user is not found', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.resendEmailVerification('notfound@example.com')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if email is already verified', async () => {
      const mockUser = {
        email: 'test@example.com',
        isVerified: true,
      };

      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.resendEmailVerification('test@example.com')).rejects.toThrow(BadRequestException);
    });
  });
});



