// import { Test, TestingModule } from '@nestjs/testing';
// import { SmsService } from './sms.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { User } from './schemas/user.schema';
// import { Twilio } from 'twilio';
// import { InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';

// const mockSendSms = jest.fn();
// const mockUserModel = {
//   findOne: jest.fn(),
//   create: jest.fn(),
// };

// jest.mock('twilio', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       messages: {
//         create: mockSendSms,
//       },
//     };
//   });
// });

// describe('SmsService', () => {
//   let smsService: SmsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         SmsService,
//         {
//           provide: getModelToken(User.name),
//           useValue: mockUserModel,
//         },
//       ],
//     }).compile();

//     smsService = module.get<SmsService>(SmsService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('sendSMS', () => {
//     it('should send an SMS successfully', async () => {
//       const phoneNumber = '+1234567890';
//       const message = 'Hello, world!';

//       mockSendSms.mockResolvedValueOnce({ sid: 'mockSid' });

//       await smsService.sendSMS(phoneNumber, message);
//       expect(mockSendSms).toHaveBeenCalledWith({
//         body: message,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: phoneNumber,
//       });
//     });

//     it('should throw InternalServerErrorException on failure', async () => {
//       mockSendSms.mockRejectedValueOnce(new Error('Twilio error'));

//       await expect(smsService.sendSMS('+1234567890', 'Hello')).rejects.toThrow(InternalServerErrorException);
//     });
//   });

//   describe('verifyPhone', () => {
//     it('should throw BadRequestException if user not found', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(null);

//       await expect(smsService.verifyPhone('+1234567890', '123456')).rejects.toThrow(BadRequestException);
//     });

//     it('should throw UnauthorizedException for invalid code', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce({
//         phone: '+1234567890',
//         phoneVerificationCode: 'wrongCode',
//         isPhoneVerified: false,
//         save: jest.fn(),
//       });

//       await expect(smsService.verifyPhone('+1234567890', '123456')).rejects.toThrow(UnauthorizedException);
//     });
//   });

//   describe('resendVerification', () => {
//     it('should resend verification code successfully', async () => {
//         const phone = '+1234567890';

//         mockUserModel.findOne.mockResolvedValue({
//             phone: phone,
//             isPhoneVerified: false,
//             save: jest.fn().mockResolvedValue(true),
//         });

//         // Set your expected environment variable here for the test
//         process.env.TWILIO_PHONE_NUMBER = '+11234567890'; // Example number

//         const result = await smsService.resendVerification(phone);
//         expect(result).toEqual({ message: 'Verification code resent successfully' });
//         expect(mockSendSms).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 body: expect.stringContaining('Your verification code is'),
//                 from: process.env.TWILIO_PHONE_NUMBER, // Ensure this matches
//                 to: phone,
//             }),
//         );
//     });

//     it('should throw BadRequestException if user not found', async () => {
//       mockUserModel.findOne.mockResolvedValueOnce(null);

//       await expect(smsService.resendVerification('+1234567890')).rejects.toThrow(BadRequestException);
//     });

//     it('should throw BadRequestException if phone is already verified', async () => {
//       const user = {
//         isPhoneVerified: true,
//         save: jest.fn(), // Ensure the save method exists
//       };

//       mockUserModel.findOne.mockResolvedValueOnce(user);

//       await expect(smsService.resendVerification('+1234567890')).rejects.toThrow(BadRequestException);
//     });
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { SmsService } from './sms.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Twilio } from 'twilio';
import { InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';

const mockSendSms = jest.fn();
const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

jest.mock('twilio', () => {
  return jest.fn().mockImplementation(() => {
    return {
      messages: {
        create: mockSendSms,
      },
    };
  });
});

describe('SmsService', () => {
  let smsService: SmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmsService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    smsService = module.get<SmsService>(SmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendSMS', () => {
    it('should send an SMS successfully', async () => {
      const phoneNumber = '+1234567890';
      const message = 'Hello, world!';

      mockSendSms.mockResolvedValueOnce({ sid: 'mockSid' });

      await smsService.sendSMS(phoneNumber, message);
      expect(mockSendSms).toHaveBeenCalledWith({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    });

    it('should throw InternalServerErrorException on failure', async () => {
      mockSendSms.mockRejectedValueOnce(new Error('Twilio error'));

      await expect(smsService.sendSMS('+1234567890', 'Hello')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('verifyPhone', () => {
    it('should throw BadRequestException if user not found', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);

      await expect(smsService.verifyPhone('+1234567890', '123456')).rejects.toThrow(BadRequestException);
    });

    it('should throw UnauthorizedException for invalid code', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({
        phone: '+1234567890',
        phoneVerificationCode: 'wrongCode',
        isPhoneVerified: false,
        save: jest.fn(),
      });

      await expect(smsService.verifyPhone('+1234567890', '123456')).rejects.toThrow(UnauthorizedException);
    });

    it('should verify phone number successfully', async () => {
      const mockUser = {
        phone: '+1234567890',
        phoneVerificationCode: '123456',
        isPhoneVerified: false,
        save: jest.fn().mockResolvedValue(true), // Mock the save function to resolve successfully
      };

      mockUserModel.findOne.mockResolvedValueOnce(mockUser);

      const result = await smsService.verifyPhone('+1234567890', '123456');
      expect(result).toEqual({ message: 'Phone number verified successfully' });
      expect(mockUser.isPhoneVerified).toBe(true); // Check that isPhoneVerified is updated
      expect(mockUser.save).toHaveBeenCalled(); // Ensure save was called
    });
  });

  describe('resendVerification', () => {
    it('should resend verification code successfully', async () => {
      const phone = '+1234567890';

      mockUserModel.findOne.mockResolvedValue({
        phone: phone,
        isPhoneVerified: false,
        save: jest.fn().mockResolvedValue(true),
      });

      // Set your expected environment variable here for the test
      process.env.TWILIO_PHONE_NUMBER = '+11234567890'; // Example number

      const result = await smsService.resendVerification(phone);
      expect(result).toEqual({ message: 'Verification code resent successfully' });
      expect(mockSendSms).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.stringContaining('Your verification code is'),
          from: process.env.TWILIO_PHONE_NUMBER, // Ensure this matches
          to: phone,
        }),
      );
    });

    it('should throw BadRequestException if user not found', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);

      await expect(smsService.resendVerification('+1234567890')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if phone is already verified', async () => {
      const user = {
        isPhoneVerified: true,
        save: jest.fn(), // Ensure the save method exists
      };

      mockUserModel.findOne.mockResolvedValueOnce(user);

      await expect(smsService.resendVerification('+1234567890')).rejects.toThrow(BadRequestException);
    });
  });
});
