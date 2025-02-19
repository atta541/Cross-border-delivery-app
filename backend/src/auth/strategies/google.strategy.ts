import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { User } from '../schemas/user.schema'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import config from '../../config/config'; 
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService, 
  ) {
    super({
      clientID: configService.google.clientID,
      clientSecret: configService.google.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback', 
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(profile)
    const { id, name, emails, photos } = profile;
    const email = emails[0].value;
  
    try {
      let user = await this.userModel.findOne({ googleId: id });
  
      if (!user) {
        const emailExists = await this.userModel.findOne({ email });
  
        if (emailExists) {
          const token = this.jwtService.sign({ id: emailExists._id, roles: emailExists.role });
          return done(null, { user: emailExists, token }); 
        }
  
        user = await this.userModel.create({
          provider: 'google',
          providerId: id,
          googleId: id,
          email: email,
          first_name: name.givenName,
          last_name: name.familyName,
          picture: photos[0].value,
          signupMethod: 'google',
        });
      } else {
        const token = this.jwtService.sign({ id: user._id, roles: user.role });
        return done(null, { user, token }); 
      }
  
      done(null, user); 
    } catch (error) {
      this.logger.error('Error during Google authentication', error);
      done(
        new HttpException('Internal server error during Google authentication', HttpStatus.INTERNAL_SERVER_ERROR),
        null,
      );
    }
  }
}