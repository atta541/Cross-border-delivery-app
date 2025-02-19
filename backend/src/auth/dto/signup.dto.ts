





// import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional } from 'class-validator';
// import { IsPhoneNumber } from 'class-validator';

// export class SignUpDto {
//   @IsNotEmpty()
//   @IsString()
//   readonly first_name: string;

//   @IsNotEmpty()
//   @IsString()
//   readonly last_name: string;

//   @IsOptional()
//   @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
//   readonly phone: string;

//   @IsNotEmpty()
//   @IsEmail({}, { message: 'Please enter a correct email' })
//   readonly email: string;

//   @IsNotEmpty()
//   @IsString()
//   readonly role: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(11, { message: 'Password must be at least 11 characters long' })
//   @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one numeral and one special character' })
//   readonly password: string;

//   @IsOptional()  // Marked as optional as you might not always need it in the DTO
//   @IsString({ message: 'countryCode must be a string' })
//   readonly countryCode?: string; // Optional field for country code
// }





// import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional } from 'class-validator';
// import { IsPhoneNumber } from 'class-validator';

// export class SignUpDto {
//   @IsNotEmpty()
//   @IsString()
//   readonly first_name: string;

//   @IsNotEmpty()
//   @IsString()
//   readonly last_name: string;

//   @IsOptional()
//   @IsString({ message: 'Phone number must be a string' })
//   readonly phone: string; // Removed phone number validation for now

//   @IsNotEmpty()
//   @IsEmail({}, { message: 'Please enter a correct email' })
//   readonly email: string;

//   @IsNotEmpty()
//   @IsString()
//   readonly role: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(11, { message: 'Password must be at least 11 characters long' })
//   @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one numeral and one special character' })
//   readonly password: string;

//   @IsOptional()  // Marked as optional as you might not always need it in the DTO
//   @IsString({ message: 'countryCode must be a string' })
//   readonly countryCode?: string; // Optional field for country code
// }


import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsPhoneNumber } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsOptional()
  @IsPhoneNumber('GB', { message: 'Please enter a valid phone number in E.164 format' }) 
  readonly phone: string;



  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11, { message: 'Password must be at least 11 characters long' })
  @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one numeral and one special character' })
  readonly password: string;

  @IsOptional()
  @IsString({ message: 'countryCode must be a string' })
  readonly countryCode?: string;
}
