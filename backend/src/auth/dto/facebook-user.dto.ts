import { IsEmail, IsString, IsOptional } from 'class-validator';

export class FacebookUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  picture?: string; // Optional profile picture URL from Facebook
}
