import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFIlters(filterDto: GetTaskFilterDto): Task[] {
    let tasks = this.getAllTasks();
    if (filterDto.status) {
      tasks = tasks.filter((task) => task.status === filterDto.status);
    }
    if (filterDto.search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(filterDto.search) ||
          task.description.toLocaleLowerCase().includes(filterDto.search)
      );
      return tasks;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    //restructuring syntax
    //Destructuring assignment
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task | undefined {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException("Object with given id not exist");
    }
    return found;
  }

  deleteTaskById(id: string) {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
