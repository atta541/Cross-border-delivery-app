

import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional() 
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly productId?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly specification?: string;

  @IsOptional()
  @IsString()
  readonly additionalInfo?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;


  @IsOptional()
  @IsNumber() 
  readonly quantity: number; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly deliverableCities?: string[];

  @IsOptional()
  @IsString()
  readonly subcategoryId?: string;
}



// import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class UpdateProductDto {
//   @ApiProperty({ example: 'Laptop', description: 'The name of the product', required: false })
//   @IsOptional()
//   @IsString()
//   readonly name?: string;

//   @ApiProperty({ example: 'PROD123', description: 'Unique product ID', required: false })
//   @IsOptional()
//   @IsString()
//   readonly productId?: string;

//   @ApiProperty({ example: 'A high-performance laptop', description: 'Description of the product', required: false })
//   @IsOptional()
//   @IsString()
//   readonly description?: string;

//   @ApiProperty({ example: '16GB RAM, 512GB SSD', description: 'Specifications of the product', required: false })
//   @IsOptional()
//   @IsString()
//   readonly specification?: string;

//   @ApiProperty({ example: '2-year warranty', description: 'Additional information about the product', required: false })
//   @IsOptional()
//   @IsString()
//   readonly additionalInfo?: string;

//   @ApiProperty({ example: 1000, description: 'Price of the product in USD', required: false })
//   @IsOptional()
//   @IsNumber()
//   readonly price?: number;

//   @ApiProperty({ example: 50, description: 'Quantity of the product available in stock', required: false })
//   @IsOptional()
//   @IsNumber()
//   readonly quantity?: number;

//   @ApiProperty({ example: ['New York', 'Los Angeles'], description: 'List of cities where the product can be delivered', required: false })
//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   readonly deliverableCities?: string[];

//   @ApiProperty({ example: 'SUBCAT456', description: 'Subcategory ID of the product', required: false })
//   @IsOptional()
//   @IsString()
//   readonly subcategoryId?: string;
// }
