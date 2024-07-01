import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { TaskPriority } from '../constants/task-priority.enum';
import { TaskStatus } from '../constants/task-status.enum';
import { Transform } from 'class-transformer';
import { OrderBy } from '../constants/order-by.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllTasksDto {
  @ApiPropertyOptional({ example: OrderBy.DESC, enum: () => OrderBy })
  @IsOptional()
  @IsIn([OrderBy.ASC, OrderBy.DESC])
  orderByDate: OrderBy;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  limit: number = 10;

  @ApiPropertyOptional({
    example: TaskPriority.NORMAL,
    enum: () => TaskPriority,
  })
  @IsOptional()
  @IsIn([TaskPriority.HIHG, TaskPriority.NORMAL, TaskPriority.MEDIUM])
  priority: TaskPriority;

  @ApiPropertyOptional({ example: TaskStatus.DONE, enum: () => TaskStatus })
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.PENDING, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive: boolean;
}
