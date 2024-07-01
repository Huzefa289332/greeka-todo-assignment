import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority } from '../constants/task-priority.enum';
import { TaskStatus } from '../constants/task-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2024-07-01T19:37:58.172Z' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ example: TaskStatus.PENDING, enum: () => TaskStatus })
  @IsOptional()
  @IsIn([
    TaskStatus.PENDING,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.PAUSED,
  ])
  status: TaskStatus;

  @ApiPropertyOptional({
    example: TaskPriority.MEDIUM,
    enum: () => TaskPriority,
  })
  @IsOptional()
  @IsIn([TaskPriority.HIHG, TaskPriority.MEDIUM, TaskPriority.NORMAL])
  priority: TaskPriority;

  @ApiPropertyOptional({ example: true, type: Boolean })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
