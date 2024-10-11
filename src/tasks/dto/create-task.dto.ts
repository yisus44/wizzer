import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(1)
    @ApiProperty({
        type: String,
        description: 'Tasks name',
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(1)
    @ApiProperty({
        type: String,
        description: 'Tasks details',
    })
    details: string;
    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        description: 'Tasks status',
    })
    isCompleted: boolean;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty({
        type: Number,
        description: 'User that will own the task',
    })
    userId: number;
}
