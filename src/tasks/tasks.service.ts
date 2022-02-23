import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./entity/taskStatus.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entity/task.entity";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UserEntity } from "../auth/entity/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  getTasks(
    filterDto: GetTaskFilterDto,
    user: UserEntity
  ): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`TaskEntity with id ${id} not found`);
    } else {
      return found;
    }
  }

  createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: UserEntity): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Tash with id ${id} not exist, cannot be deleted`
      );
    }
  }

  async updateTaskStatus(id: string, user: UserEntity, status: TaskStatus) {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
