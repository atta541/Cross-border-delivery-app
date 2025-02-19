import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, Matches, IsInt, Min, Max } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsPhoneNumber('PK') // Correct country code for Pakistan
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  line1: string;

  // @Matches(/^[0-9]{5}$/, { message: 'Postal code must be a 5-digit number' }) // Validate Pakistan postal code format (5 digits)
  // @IsNotEmpty()
  // postal_code: string;


  @IsNotEmpty()
  postal_code: string;


  @IsInt()
  @Min(1)
  @Max(31)
  dob_day: number;

  @IsInt()
  @Min(1)
  @Max(12)
  dob_month: number;

  @IsInt()
  dob_year: number;
}
