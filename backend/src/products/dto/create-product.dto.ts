import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly productId: string;

  @IsString()
  readonly subcategoryId: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly specification: string;

  @IsString()
  readonly additionalInfo: string;

  @IsNumber()
  readonly price: number;


  @IsNumber() 
  readonly quantity: number; 


  @IsArray()
  @IsString({ each: true })
  readonly deliverableCities: string[];
}



// import { IsString, IsNumber, IsArray } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateProductDto {
//   @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
//   @IsString()
//   readonly name: string;

//   @ApiProperty({ example: 'PROD123', description: 'Unique product ID' })
//   @IsString()
//   readonly productId: string;

//   @ApiProperty({ example: 'SUBCAT456', description: 'Subcategory ID of the product' })
//   @IsString()
//   readonly subcategoryId: string;

//   @ApiProperty({ example: 'A high-performance laptop', description: 'Description of the product' })
//   @IsString()
//   readonly description: string;

//   @ApiProperty({ example: '16GB RAM, 512GB SSD', description: 'Specifications of the product' })
//   @IsString()
//   readonly specification: string;

//   @ApiProperty({ example: '2-year warranty', description: 'Additional information about the product' })
//   @IsString()
//   readonly additionalInfo: string;

//   @ApiProperty({ example: 1000, description: 'Price of the product in USD' })
//   @IsNumber()
//   readonly price: number;

//   @ApiProperty({ example: 50, description: 'Quantity of the product available in stock' })
//   @IsNumber()
//   readonly quantity: number;

//   @ApiProperty({ example: ['New York', 'Los Angeles'], description: 'List of cities where the product can be delivered' })
//   @IsArray()
//   @IsString({ each: true })
//   readonly deliverableCities: string[];
// }
