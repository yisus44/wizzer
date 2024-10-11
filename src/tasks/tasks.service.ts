import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { RelationDoNotExistsException } from 'src/common/exceptions/relation-do-not-exists.exception';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor( @InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      if (error?.code === PostgresErrorCode.ForeignKeyViolation) {
        throw new RelationDoNotExistsException("That user does not exist in the database");
      }
      throw error;
    }
  }

  async findPaginated(
    paginationDto: PaginationDto = { page: 1, perPage: 100 },
    findOptionsWhere: FindOptionsWhere<Task> = {},
    findOptionsOrder: FindOptionsOrder<Task> = {},
  ): Promise<PageDto<Task[]>> {
    const { page, perPage } = paginationDto;
    const skippedItems = (page - 1) * perPage;
    const [data, totalCount] = await this.taskRepository.findAndCount({
      skip: skippedItems,
      take: perPage,
      where: {
        ...findOptionsWhere,
      },
      order: findOptionsOrder,
    });
    return this.calculatePagination(data, totalCount, page, perPage);
  }

  calculatePagination(
    data: Task[],
    totalCount: number,
    page: number,
    perPage: number,
  ) {
    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    return {
      data,
      page,
      perPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }
  async findOne(id: number) {
    return  await this.taskRepository.findOneBy({id})
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const match = await this.findOne(id);
    delete updateTaskDto.userId;
    if(!match) throw new NotFoundException();
    await this.taskRepository.update(
      {id},
      updateTaskDto,
    );
    const updatedEntity = await this.findOne(id);
    return updatedEntity;
  }

  async remove(id: number) {
    const match = await this.findOne(id);
    if(!match) throw new NotFoundException();
    await this.taskRepository.delete({id});
    return match;
  }
}
