import { IsNotEmpty } from 'class-validator';

export class RemoveBasketItemDto {
  @IsNotEmpty()
  productId: string;
}
