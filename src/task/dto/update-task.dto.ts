import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority } from '../constants/task-priority.enum';
import { TaskStatus } from '../constants/task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Task 1' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '2024-07-01T19:37:58.172Z' })
  @IsOptional()
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ example: TaskStatus.PAUSED, enum: () => TaskStatus })
  @IsOptional()
  @IsIn([
    TaskStatus.PENDING,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.PAUSED,
  ])
  status: TaskStatus;

  @ApiPropertyOptional({ example: TaskPriority.HIHG, enum: () => TaskPriority })
  @IsOptional()
  @IsIn([TaskPriority.HIHG, TaskPriority.MEDIUM, TaskPriority.NORMAL])
  priority: TaskPriority;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
