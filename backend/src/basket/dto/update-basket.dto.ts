import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBasketItemDto {
  @IsOptional()
  productId: string;  

  

  @IsNotEmpty()
  quantity: number;   

  @IsOptional()
  ID: string;
}
