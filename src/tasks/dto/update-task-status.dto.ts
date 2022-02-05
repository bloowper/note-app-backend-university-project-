import { TaskStatus } from "../entity/taskStatus.enum";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}