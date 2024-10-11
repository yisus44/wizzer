import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    //as of now, we have to 
    @ApiProperty({
        type: Boolean,
        description: 'Tasks status',
    })
    isCompleted: boolean;

     //as of now, we have to 
     @ApiProperty({
        type: String,
        description: 'Tasks details',
    })
    details: string;
}
