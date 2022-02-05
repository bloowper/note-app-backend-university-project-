import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task.model.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  //getAllTasks(): Task[] {
  //  return this.tasks;
  //}
  //
  //getTasksWithFIlters(filterDto: GetTaskFilterDto): Task[] {
  //  let tasks = this.getAllTasks();
  //  if (filterDto.status) {
  //    tasks = tasks.filter((task) => task.status === filterDto.status);
  //  }
  //  if (filterDto.search) {
  //    tasks = tasks.filter(
  //      (task) =>
  //        task.title.toLocaleLowerCase().includes(filterDto.search) ||
  //        task.description.toLocaleLowerCase().includes(filterDto.search)
  //    );
  //    return tasks;
  //  }
  //}
  //
  //
  //updateTaskStatus(id: string, status: TaskStatus) {
  //  const task = this.getTaskById(id);
  //  task.status = status;
  //  return task;
  //}

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
