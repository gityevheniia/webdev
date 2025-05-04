import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  publication_year?: number;
}
