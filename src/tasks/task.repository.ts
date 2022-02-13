import { EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "./entity/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./entity/taskStatus.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UserEntity } from "../auth/entity/user.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });
    return await this.save(task);
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder("task");
    if (status) {
      query.andWhere("task.status = :status", { status: status });
    }
    if (search) {
      query.andWhere(
        "LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)",
        { search: `%${search}%` }
      );
    }
    const task = await query.getMany();
    return task;
  }
}
