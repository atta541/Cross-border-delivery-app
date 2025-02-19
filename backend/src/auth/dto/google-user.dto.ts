import { IsEmail, IsString,IsOptional } from 'class-validator';

export class GoogleUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;


  @IsOptional()
  @IsString()
  phone_number:string

  @IsString()
  picture?: string; 
}
