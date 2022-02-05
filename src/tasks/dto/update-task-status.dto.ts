import { TaskStatus } from "../task.model.enum";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}