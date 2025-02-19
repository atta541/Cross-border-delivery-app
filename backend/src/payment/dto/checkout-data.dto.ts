import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckoutDataDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string; 
}
