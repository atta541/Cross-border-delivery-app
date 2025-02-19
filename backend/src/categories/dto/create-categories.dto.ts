import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}



