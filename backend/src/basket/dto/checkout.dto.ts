import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// class CheckoutItemDto {
//     @IsNotEmpty()
//     productId: string;

//     @IsNotEmpty()
//     quantity: number;
// }

class CheckoutItemDto {
    @IsOptional()
    productId?: string;

    @IsNotEmpty()
    quantity: number;

    @IsOptional()
    price: number;

    @IsNotEmpty()
    type: string;  // Add type to distinguish valid/unknown items

    @IsOptional()
    Productname: string;
}


export class CheckoutDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];
}

