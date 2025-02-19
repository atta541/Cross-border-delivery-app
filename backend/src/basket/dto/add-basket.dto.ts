import { IsArray, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;

    @IsOptional()
    ProductType?: string;
}

export class AddBasketItemDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[];
}
