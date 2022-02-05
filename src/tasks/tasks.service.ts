import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task.model.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    } else {
      return found;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Tash with id ${id} not exist, cannot be deleted`
      );
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
