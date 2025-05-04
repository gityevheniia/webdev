import { IsString, IsInt, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  description: string;

  @IsInt()
  publication_year: number;

  @IsUrl()
  file_url: string;
}
