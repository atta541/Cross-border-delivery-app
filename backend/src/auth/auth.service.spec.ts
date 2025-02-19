
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'; 
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { FacebookUserDto } from './dto/facebook-user.dto';
import { Model } from 'mongoose';

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('$2a$10$XmCPO/zHUBB4ics.IoQMveV4IPBt3zVG7SPg1JcZrQ5rO.Gxn7obi'),
    compare: jest.fn(),
}));

describe('AuthService', () => {
    let service: AuthService;
    let userModel: Model<User>;
    let jwtService: JwtService;

    const mockUserModel = {
        findOne: jest.fn(),
        create: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userModel = module.get<Model<User>>(getModelToken(User.name));
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('signUp', () => {
        it('should throw an error if first name and last name are missing', async () => {
            const signUpDto: SignUpDto = {
                first_name: '',
                last_name: '',
                email: 'test@example.com',
                password: 'password123',
                phone: '1234567890',
                role: 'user',
            };

            await expect(service.signUp(signUpDto)).rejects.toThrow(BadRequestException);
        });





        it('should throw an error if user already exists', async () => {
            const signUpDto: SignUpDto = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test@example.com',
                password: 'password123',
                phone: '1234567890',
                role: 'user',
            };

            mockUserModel.findOne.mockResolvedValueOnce({ _id: 'existingUserId', email: signUpDto.email });

            await expect(service.signUp(signUpDto)).rejects.toThrow(BadRequestException);
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: signUpDto.email });
        });




        it('should throw an error if email is missing', async () => {
            const signUpDto: SignUpDto = {
                first_name: 'John',
                last_name: 'Doe',
                email: '',
                password: 'password123',
                phone: '1234567890',
                role: 'user',
            };

            await expect(service.signUp(signUpDto)).rejects.toThrow(BadRequestException);
        });

        it('should throw an error if the password is less than 8 characters', async () => {
            const signUpDto: SignUpDto = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test@example.com',
                password: 'short',
                phone: '1234567890',
                role: 'user',
            };

            await expect(service.signUp(signUpDto)).rejects.toThrow(BadRequestException);
        });

        it('should create a new user and return a token', async () => {
            const signUpDto: SignUpDto = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test@example.com',
                password: 'password123',
                phone: '1234567890',
                role: 'user',
            };

            mockUserModel.findOne.mockResolvedValueOnce(null);
            mockUserModel.create.mockResolvedValueOnce({
                _id: 'testId',
                ...signUpDto,
                password: '$2a$10$XmCPO/zHUBB4ics.IoQMveV4IPBt3zVG7SPg1JcZrQ5rO.Gxn7obi',
            });
            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.signUp(signUpDto);

            expect(mockUserModel.create).toHaveBeenCalledWith({
                first_name: signUpDto.first_name,
                last_name: signUpDto.last_name,
                email: signUpDto.email,
                phone: signUpDto.phone,
                password: '$2a$10$XmCPO/zHUBB4ics.IoQMveV4IPBt3zVG7SPg1JcZrQ5rO.Gxn7obi',
                role: signUpDto.role,
            });
            expect(result.token).toEqual('testToken');
        });
    });

    describe('login', () => {
        it('should throw an error if the email or password is missing', async () => {
            const loginDto: LoginDto = { email: '', password: '' };

            await expect(service.login(loginDto)).rejects.toThrow(BadRequestException);
        });

        it('should throw an error if the user is not found', async () => {
            const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };

            mockUserModel.findOne.mockResolvedValueOnce(null);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw an error if the password does not match', async () => {
            const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };
            const user = { email: loginDto.email, password: await bcrypt.hash('wrongPassword', 10) };

            mockUserModel.findOne.mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token if the email and password are valid', async () => {
            const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };
            const user = { _id: 'testId', email: loginDto.email, password: await bcrypt.hash(loginDto.password, 10), role: 'user' };

            mockUserModel.findOne.mockResolvedValueOnce(user);
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.login(loginDto);

            expect(result.token).toEqual('testToken');
        });
    });

    describe('googleAuth', () => {
        it('should throw an error if first name, last name, or email are missing', async () => {
            const googleUserDto: GoogleUserDto = { email: '', first_name: '', last_name: '', phone_number: '' };

            await expect(service.googleAuth(googleUserDto)).rejects.toThrow(BadRequestException);
        });

        it('should create a new user if Google user does not exist', async () => {
            const googleUserDto: GoogleUserDto = {
                email: 'test@example.com',
                first_name: 'John',
                last_name: 'Doe',
                phone_number: '1234567890',
            };

            mockUserModel.findOne.mockResolvedValueOnce(null);
            mockUserModel.create.mockResolvedValueOnce({
                _id: 'testId',
                ...googleUserDto,
                role: 'client',
            });
            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.googleAuth(googleUserDto);

            expect(mockUserModel.create).toHaveBeenCalledWith({
                email: googleUserDto.email,
                first_name: googleUserDto.first_name,
                last_name: googleUserDto.last_name,
                phone: googleUserDto.phone_number,
                role: 'client',
            });
            expect(result.token).toEqual('testToken');
        });

        it('should return a token for an existing Google user', async () => {
            const googleUserDto: GoogleUserDto = {
                email: 'test@example.com',
                first_name: 'John',
                last_name: 'Doe',
                phone_number: '1234567890',
            };
            const user = { _id: 'testId', email: googleUserDto.email, role: 'client' };

            mockUserModel.findOne.mockResolvedValueOnce(user);
            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.googleAuth(googleUserDto);

            expect(result.token).toEqual('testToken');
        });
    });

    describe('facebookAuth', () => {
        it('should throw an error if first name, last name, or email are missing', async () => {
            const facebookUserDto: FacebookUserDto = { email: '', first_name: '', last_name: '' };

            await expect(service.facebookAuth(facebookUserDto)).rejects.toThrow(BadRequestException);
        });

        it('should create a new user if Facebook user does not exist', async () => {
            const facebookUserDto: FacebookUserDto = { email: 'test@example.com', first_name: 'John', last_name: 'Doe' };

            mockUserModel.findOne.mockResolvedValueOnce(null);
            mockUserModel.create.mockResolvedValueOnce({ _id: 'testId', ...facebookUserDto, role: 'client' });
            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.facebookAuth(facebookUserDto);

            expect(mockUserModel.create).toHaveBeenCalledWith({
                email: facebookUserDto.email,
                first_name: facebookUserDto.first_name,
                last_name: facebookUserDto.last_name,
                role: 'client',
            });
            expect(result.token).toEqual('testToken');
        });

        it('should return a token for an existing Facebook user', async () => {
            const facebookUserDto: FacebookUserDto = { email: 'test@example.com', first_name: 'John', last_name: 'Doe' };
            const user = { _id: 'testId', email: facebookUserDto.email, role: 'client' };

            mockUserModel.findOne.mockResolvedValueOnce(user);
            mockJwtService.sign.mockReturnValueOnce('testToken');

            const result = await service.facebookAuth(facebookUserDto);

            expect(result.token).toEqual('testToken');
        });
    });

    describe('googleAuthCallback', () => {
        it('should throw UnauthorizedException if user is not present', async () => {
            const req = { user: null };

            await expect(service.googleAuthCallback(req)).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token if user is present', async () => {
            const req = { user: { token: 'testToken' } };

            const result = await service.googleAuthCallback(req);

            expect(result.token).toEqual('testToken');
        });
    });

    describe('facebookAuthCallback', () => {
        it('should throw UnauthorizedException if user is not present', async () => {
            const req = { user: null };

            await expect(service.facebookAuthCallback(req)).rejects.toThrow(UnauthorizedException);
        });

        it('should return a token if user is present', async () => {
            const req = { user: { token: 'testToken' } };

            const result = await service.facebookAuthCallback(req);

            expect(result.token).toEqual('testToken');
        });
    });

    describe('validateGoogleUser', () => {
        it('should throw an error with "Method not implemented."', async () => {
          const googleUserDto: GoogleUserDto = {
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
          };
      
          // Assert that the method throws the expected error
          expect(() => service.validateGoogleUser(googleUserDto)).toThrowError(new Error('Method not implemented.'));
        });
      });
      

});
