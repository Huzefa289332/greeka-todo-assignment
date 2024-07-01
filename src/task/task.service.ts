import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async createTask(body: CreateTaskDto) {
    const task = this.taskRepo.create(body);
    return this.taskRepo.save(task);
  }

  async updateTask(id: number, body: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepo.save({ ...task, ...body });
  }

  async deleteTask(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepo.remove(task);
  }

  async getTask(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async getAllTasks(query: GetAllTasksDto) {
    const { page, limit, orderByDate, ...rest } = query;

    return await this.taskRepo.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { dueDate: orderByDate },
      where: rest,
    });
  }
}
