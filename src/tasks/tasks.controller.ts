import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { TaskEntity } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(taskDto);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }
}
