import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    @ApiProperty()
    password: string;
  
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;
  }