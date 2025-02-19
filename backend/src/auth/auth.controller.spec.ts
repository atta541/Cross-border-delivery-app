import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    login: jest.fn(),
    googleAuthCallback: jest.fn(),
    facebookAuthCallback: jest.fn(),
  };

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.cookie = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService signUp and return a token', async () => {
      const signUpDto: SignUpDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        role: 'user',
      };
      const mockToken = { token: 'testToken' };
      mockAuthService.signUp.mockResolvedValueOnce(mockToken);

      const result = await controller.signup(signUpDto);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(result).toEqual(mockToken);
    });
  });

  describe('login', () => {
    it('should call AuthService login and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockToken = { token: 'testToken' };
      mockAuthService.login.mockResolvedValueOnce(mockToken);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockToken);
    });

    it('should throw an UnauthorizedException if login fails', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'invalidPassword',
      };

      mockAuthService.login.mockRejectedValueOnce(
        new UnauthorizedException('Invalid email or password'),
      );

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('googleAuthCallback', () => {
    it('should set a cookie and redirect after successful Google authentication', async () => {
      const mockReq = { user: { token: 'testToken' } };
      const res = mockResponse() as Response;

      mockAuthService.googleAuthCallback.mockResolvedValueOnce({ token: 'testToken' });

      await controller.googleAuthCallback(mockReq, res);

      expect(authService.googleAuthCallback).toHaveBeenCalledWith(mockReq);
      expect(res.cookie).toHaveBeenCalledWith('access_token', 'testToken', {
        maxAge: 2592000000, // 30 days
        sameSite: true,
        secure: false,
      });
      expect(res.redirect).toHaveBeenCalledWith('http://localhost:3000');
    });

    it('should throw UnauthorizedException if user is not authenticated', async () => {
      const mockReq = { user: null };
      const res = mockResponse() as Response;

      mockAuthService.googleAuthCallback.mockRejectedValueOnce(
        new UnauthorizedException('User not authenticated'),
      );

      await expect(controller.googleAuthCallback(mockReq, res)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('facebookAuthCallback', () => {
    it('should set a cookie and redirect after successful Facebook authentication', async () => {
      const mockReq = { user: { token: 'testToken' } };
      const res = mockResponse() as Response;

      mockAuthService.facebookAuthCallback.mockResolvedValueOnce({ token: 'testToken' });

      await controller.facebookAuthCallback(mockReq, res);

      expect(authService.facebookAuthCallback).toHaveBeenCalledWith(mockReq);
      expect(res.cookie).toHaveBeenCalledWith('access_token', 'testToken', {
        maxAge: 2592000000, // 30 days
        sameSite: true,
        secure: false,
      });
      expect(res.redirect).toHaveBeenCalledWith('http://localhost:3000');
    });

    it('should return an error response if authentication fails', async () => {
      const mockReq = { user: null };
      const res = mockResponse() as Response;

      mockAuthService.facebookAuthCallback.mockRejectedValueOnce(
        new Error('Authentication failed'),
      );

      await controller.facebookAuthCallback(mockReq, res);

      expect(authService.facebookAuthCallback).toHaveBeenCalledWith(mockReq);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });
  });
});
