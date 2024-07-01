import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller({ version: '1', path: 'task' })
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTask(id);
  }

  @Get()
  getAllTasks(@Query() query: GetAllTasksDto) {
    return this.taskService.getAllTasks(query);
  }
}
