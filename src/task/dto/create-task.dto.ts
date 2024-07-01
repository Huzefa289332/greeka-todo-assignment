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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional()
  @IsIn([
    TaskStatus.PENDING,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.PAUSED,
  ])
  status: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority })
  @IsOptional()
  @IsIn([TaskPriority.HIHG, TaskPriority.MEDIUM, TaskPriority.NORMAL])
  priority: TaskPriority;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
