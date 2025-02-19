import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly categoryId: string; 
}


