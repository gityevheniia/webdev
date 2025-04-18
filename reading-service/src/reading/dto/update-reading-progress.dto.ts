import { IsOptional, IsInt, IsNumber, Min, Max } from 'class-validator';

export class UpdateReadingDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  current_page?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage_read?: number;
}
