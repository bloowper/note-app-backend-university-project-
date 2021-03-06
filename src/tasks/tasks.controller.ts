import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { TaskEntity } from "./entity/task.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "../auth/entity/user.entity";
import { GetUser } from "../auth/get-user.decorator";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController");
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity[]> {
    this.logger.verbose(
      `Username: ${user.username} id: ${
        user.id
      } fetching tasks with filterDto: ${JSON.stringify(filterDto)}`
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(
    @Param("id") id: string,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() taskDto: CreateTaskDto,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(taskDto, user);
  }

  @Delete("/:id")
  deleteTaskById(
    @Param("id") id: string,
    @GetUser() user: UserEntity
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(
      id,
      user,
      updateTaskStatusDto.status
    );
  }
}
