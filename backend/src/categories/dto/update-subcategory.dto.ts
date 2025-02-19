import { IsString, IsOptional } from 'class-validator';

export class UpdateSubcategoryDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly categoryId?: string; 
}
