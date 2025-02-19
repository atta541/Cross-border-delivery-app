
import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  Query,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { FacebookOauthGuard } from '../guards/facebook.auth.guard';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';
import { SmsService } from './sms/sms.service';
import { EmailService } from '@src/email/email.service';

@Controller('auth')
export class AuthController {
  userModel: any;
// localhost/3000/auth/signup

  constructor(private authService: AuthService,
    private readonly smsService: SmsService, // Inject SmsService here
    private readonly emailService: EmailService


  ) { }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto, @Req() req: ExpressRequest): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto, req, global.Request); // Pass global.Request or another suitable object
  }


  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
  //   return this.authService.login(loginDto);
  // }


  // @Post('login/admin')
  // async adminLogin(@Body() loginDto: LoginDto): Promise<{ token: string }> {
  //   return this.authService.adminLogin(loginDto);
  // }



  // Regular login route for non-admin users
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Login route called');

    return this.authService.login(loginDto);
  }

  // Admin login route for SuperAdmin only
  @Post('login/admin')
  async adminLogin(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.adminLogin(loginDto);
  }



  





  // Verify the email
  @Get('verify')
  async verifyEmail(@Query('token') token: string, @Res() response: Response) {
    const result = await this.emailService.verifyEmail(token);
    return response.status(HttpStatus.OK).json(result);
  }

  //verify phone
  @Post('verify-phone')
  async verifyPhone(@Body('phone') phone: string, @Body('code') code: string) {
    if (!phone || !code) {
      throw new BadRequestException('Phone and code are required');
    }
    return this.smsService.verifyPhone(phone, code);
  }

  @Post('resend-verification')
  async resendVerification(@Body() { phone }: { phone: string }) {
    return this.smsService.resendVerification(phone);
  }

  @Post('resend-verification-email')
  async resendEmailVerification(@Body() { email }: { email: string }) {
    return this.emailService.resendEmailVerification(email);
  }



  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async authGoogle() { }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    console.log('google route called');

    const { token } = await this.authService.googleAuthCallback(req);
    res.cookie('access_token', token, {
      maxAge: 2592000000, // 30 days
      sameSite: true,
      secure: false, // Set to true if using HTTPS
    });
    return res.redirect('http://localhost:3000'); // Redirect to your frontend
  }

  @Get('facebook')
  @UseGuards(FacebookOauthGuard)
  async authFacebook() { }

  @Get('facebook/callback')
  @UseGuards(FacebookOauthGuard)
  async facebookAuthCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    try {
      const { token } = await this.authService.facebookAuthCallback(req);
      res.cookie('access_token', token, {
        maxAge: 2592000000, // 30 days
        sameSite: true,
        secure: false, // Set to true if using HTTPS
      });
      return res.redirect('http://localhost:3000'); // Redirect to your frontend
    } catch (error) {
      console.error('Error in Facebook auth callback:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Authentication failed' });
    }
  }
}





