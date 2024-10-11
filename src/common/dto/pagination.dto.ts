import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({description: "Current page", required: false})
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({description: "Page size",  required: false})
  perPage: number = 10;
}