import { IsArray, IsNotEmpty, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { is } from 'cheerio/dist/commonjs/api/traversing';

export class ItemDto {
    @IsNotEmpty()
    price: number | string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    quantity: string;

    @IsOptional()
    ProductType: string;

    @IsOptional()
    Image: string;
    
    



}

