import { IsString, IsInt, IsOptional, IsUrl } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  publication_year?: number;

  @IsUrl()
  @IsOptional()
  file_url?: string;
}
