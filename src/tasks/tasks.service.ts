import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.IN_PROGRESS
    };
    this.tasks.push(task);
    return task;
  }
}
