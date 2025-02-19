

import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema'; 
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  private readonly logger = new Logger(FacebookStrategy.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService 
  ) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'), 
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
): Promise<any> {
    console.log(profile); 

    const { id, name, emails, photos } = profile;

    if (!emails || emails.length === 0) {
        return done(new HttpException('No email found from Facebook', HttpStatus.BAD_REQUEST), null);
    }

    const email = emails[0].value;

    try {
        let user = await this.userModel.findOne({ facebookId: id });

        if (!user) {
            const emailExists = await this.userModel.findOne({ email });

            if (emailExists) {
                const token = this.jwtService.sign({ id: emailExists._id, roles: emailExists.role });
                return done(null, { user: emailExists, token }); 
            }

            user = await this.userModel.create({
                provider: 'facebook',
                providerId: id,
                facebookId: id,
                email: email,
                first_name: name.givenName,
                last_name: name.familyName,
                picture: photos && photos.length > 0 ? photos[0].value : null, 
                signupMethod: 'facebook',
            });
        } else {
            const token = this.jwtService.sign({ id: user._id, roles: user.role });
            return done(null, { user, token }); 
        }

        done(null, user); 
    } catch (error) {
        this.logger.error('Error during Facebook authentication', error);
        done(
            new HttpException('Internal server error during Facebook authentication', HttpStatus.INTERNAL_SERVER_ERROR),
            null,
        );
    }
}
}




