import { IsString, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString() title: string;
  @IsString() author: string;
  @IsString() genre: string;
  @IsString() description: string;
  @IsInt() publication_year: number;
  @IsString() file_url: string;
}
