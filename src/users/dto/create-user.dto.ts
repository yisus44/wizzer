import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(5)
    @ApiProperty({
        type: String,
        description: 'User email',
    })
    email:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    @ApiProperty({
        type: String,
        description: 'User fullname',
    })
    name:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(8)
    @ApiProperty({
        type: String,
        description: 'User password with minimun length of 8',
    })
    password:string;
}
