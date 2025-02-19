import { IsString, IsDate, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  eventName: string;

  @IsEnum(['Islamic', 'Christian', 'National', 'Other'])
  eventType: string;

  @Type(() => Date) 
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  recurring: boolean;

  @IsEnum(['Islam', 'Christianity', 'None'])
  religion: string;

  @IsOptional()
  @IsString()
  country?: string = 'Pakistan';
}
