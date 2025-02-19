import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Verification, VerificationDocument } from './schemas/verification.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { FacebookUserDto } from './dto/facebook-user.dto';
import { EmailService } from '../email/email.service';
import { SmsService } from './sms/sms.service';
import { v4 as uuidv4 } from 'uuid';
import * as geoip from 'geoip-lite';
import { Request } from 'express';

import { Request as ExpressRequest } from 'express';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  validateGoogleUser(googleUserDto: GoogleUserDto): any {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Verification.name)
    private verificationModel: Model<VerificationDocument>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private smsService: SmsService,
  ) { }

  async signUp(signUpDto: SignUpDto, req: Request, Request: { new(input: RequestInfo | URL, init?: RequestInit): globalThis.Request; prototype: globalThis.Request; }): Promise<{ token: string }> {
    const { first_name, last_name, email, password, role, phone } = signUpDto;

    // Validate required fields
    if (!first_name || !last_name) {
      throw new BadRequestException('First name and last name are required.');
    }
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters.');
    }

    // Determine user's location using IP
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // const geo = geoip.lookup(ip);

    // if (!geo || !geo.country) {
    //   throw new BadRequestException('Could not determine location based on IP.');
    // }

    // const countryCode = this.getCountryCodeFromGeo(geo.country);
    // if (!countryCode) {
    //   throw new BadRequestException('Could not determine country code from IP.');
    // }
    // let fullPhoneNumber = `${countryCode}${phone}`;
    let fullPhoneNumber = '+447405748652';

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4();
    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const verification = await this.verificationModel.create({
      verificationToken,
      phoneVerificationCode,
      isVerified: false,
      isPhoneVerified: false,
    });

    // Send email and SMS verification
    // await this.emailService.sendVerificationEmail(email, verificationToken);
    // await this.smsService.sendSMS(fullPhoneNumber, `Your verification code is ${phoneVerificationCode}`);

    // Create the user with reference to verification
    const user = await this.userModel.create({
      first_name,
      last_name,
      email,
      phone: fullPhoneNumber,
      password: hashedPassword,
      role,
      verification: verification._id,  // Reference the verification document
    });

    const token = this.jwtService.sign({ id: user._id, roles: user.role });
    return { token };
  }





  private getCountryCodeFromGeo(country: string): string {
    const countryCodes = {
      'US': '+1',    // United States
      'GB': '+44',   // United Kingdom
      'CA': '+1',    // Canada
      'AU': '+61',   // Australia
      'IN': '+91',   // India
      'PK': '+92',   // Pakistan
      'DE': '+49',   // Germany
      'FR': '+33',   // France
      'IT': '+39',   // Italy
      'ES': '+34',   // Spain
      'BR': '+55',   // Brazil
      'ZA': '+27',   // South Africa
      'MX': '+52',   // Mexico
      'NG': '+234',  // Nigeria
      'RU': '+7',    // Russia
    };
    return countryCodes[country] || '';
  }



  // // modify for the admin login
  //   async adminLogin(loginDto: LoginDto): Promise<{ token: string }> {
  //     const { email, password } = loginDto;

  //     // Check if the login attempt is for superadmin
  //     const superAdminEmail = process.env.SUPERADMIN_EMAIL;
  //     const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

  //     if (email === superAdminEmail && password === superAdminPassword) {
  //       const superAdminToken = this.jwtService.sign({
  //         email: superAdminEmail,
  //         roles: [Role.SuperAdmin],
  //       });
  //       return { token: superAdminToken }; // Return token for SuperAdmin
  //     }

  //     // Normal user login
  //     if (!email || !password) {
  //       throw new BadRequestException('Email and password are required.');
  //     }

  //     const user = await this.userModel.findOne({ email }).populate('verification');
  //     if (!user) {
  //       throw new UnauthorizedException('Invalid email or password');
  //     }

  //     const isPasswordMatched = await bcrypt.compare(password, user.password);
  //     if (!isPasswordMatched) {
  //       throw new UnauthorizedException('Invalid email or password');
  //     }

  //     const token = this.jwtService.sign({
  //       id: user._id,
  //       roles: user.role,
  //       sub: user._id,
  //     });

  //     return { token };
  //   }





  //   async login(loginDto: LoginDto): Promise<{ token: string }> {
  //     const { email, password } = loginDto;

  //     if (!email || !password) {
  //       throw new BadRequestException('Email and password are required.');
  //     }

  //     const user = await this.userModel.findOne({ email }).populate('verification');
  //     if (!user) {
  //       throw new UnauthorizedException('Invalid email or password');
  //     }

  //     const isPasswordMatched = await bcrypt.compare(password, user.password);
  //     if (!isPasswordMatched) {
  //       throw new UnauthorizedException('Invalid email or password');
  //     }

  //     const token = this.jwtService.sign({
  //       id: user._id,
  //       roles: user.role,
  //       sub: user._id,
  //     });

  //     return { token };
  //   }








  // Admin login (SuperAdmin only)
  async adminLogin(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Verify credentials match super admin
    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

    if (email !== superAdminEmail || password !== superAdminPassword) {
      throw new UnauthorizedException('Only SuperAdmin can access this route.');
    }

    // Generate token with super admin role
    const superAdminToken = this.jwtService.sign({
      email: superAdminEmail,
      roles: [Role.SuperAdmin],
    });
    return { token: superAdminToken };
  }

  // Regular user login (Non-admin users only)
  // async login(loginDto: LoginDto): Promise<{ token: string }> {
  //   const { email, password } = loginDto;

  //   if (!email || !password) {
  //     throw new BadRequestException('Email and password are required.');
  //   }

  //   const user = await this.userModel.findOne({ email }).populate('verification');
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   // Check if 'SuperAdmin' role is present in the user's roles array
  //   if (user.role.includes(Role.SuperAdmin)) {
  //     throw new UnauthorizedException('SuperAdmin must use the /login/admin route.');
  //   }


  //   const isPasswordMatched = await bcrypt.compare(password, user.password);
  //   if (!isPasswordMatched) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const token = this.jwtService.sign({
  //     id: user._id,
  //     roles: user.role,
  //     sub: user._id,
  //   });

  //   return { token };
  // }


  async login(loginDto: LoginDto): Promise<{ token: string; role: string }> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required.');
    }

    const user = await this.userModel.findOne({ email }).populate('verification');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if 'SuperAdmin' role is present in the user's roles array
    if (user.role.includes(Role.SuperAdmin)) {
      throw new UnauthorizedException('SuperAdmin must use the /login/admin route.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      roles: user.role,
      sub: user._id,
    });

    // Return the first role in the array
    return {
      token,
      role: user.role[0]  // Assuming at least one role exists
    };
  }

  async googleAuth(googleUserDto: GoogleUserDto): Promise<{ token: string }> {
    const { email, first_name, last_name, phone_number } = googleUserDto;

    if (!first_name || !last_name || !email) {
      throw new BadRequestException('First name, last name, and email are required.');
    }

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({
        first_name,
        last_name,
        email,
        phone: phone_number,
        role: 'client',
      });
    }

    const token = this.jwtService.sign({ id: user._id, roles: user.role });
    return { token };
  }

  async facebookAuth(facebookUserDto: FacebookUserDto): Promise<{ token: string }> {
    const { email, first_name, last_name } = facebookUserDto;

    if (!first_name || !last_name || !email) {
      throw new BadRequestException('First name, last name, and email are required.');
    }

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({
        first_name,
        last_name,
        email,
        role: 'client',
      });
    }

    const token = this.jwtService.sign({ id: user._id, roles: user.role });
    return { token };
  }

  // async googleAuthCallback(req): Promise<{ token: string }> {
  //   const { user } = req;
  //   if (!user) {
  //     throw new UnauthorizedException('User not authenticated');
  //   }
  //   return { token: user.token };
  // }


  async googleAuthCallback(req): Promise<{ token: string }> {
    const { user } = req;
    console.log('Google user data:', user);  // Log user data
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return { token: user.token };
  }

  async facebookAuthCallback(req): Promise<{ token: string }> {
    const { user } = req;
    console.log('facebook user data:', user);  // Log user data

    if (!user) {
      console.error('User not authenticated', req);
      throw new UnauthorizedException('User not authenticated');
    }
    return { token: user.token };
  }
}





























