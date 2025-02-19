import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from '../schemas/user.schema'


export type JwtPayload = {
  sub: string; 
  email: string; 
  roles: string[]; 
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }




  // async validate(payload: JwtPayload) {
  //   const user = await this.userModel.findById(payload.sub); 
  //   if (!user) {
  //     throw new UnauthorizedException('Please log in to continue');
  //   }
  //   return {
  //     id: user._id,
  //     email: user.email, 
  //     roles: payload.roles,
  //   };
  // }
  


  async validate(payload: JwtPayload) {
    console.log('JWT Payload:', payload); // Debugging line
    const user = await this.userModel.findById(payload.sub); 
    if (!user) {
      throw new UnauthorizedException('Please log in to continue');
    }
    return {
      id: user._id,
      email: user.email, 
      roles: payload.roles,
    };
  }
  


}