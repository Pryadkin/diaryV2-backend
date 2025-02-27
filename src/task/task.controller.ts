import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TaskDto } from './dto/task.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('user/tasks')
@ApiTags('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
		return this.taskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Body() dto: TaskDto, @Param('id') taskId: string) {
		return this.taskService.update(dto, taskId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') taskId: string) {
		return this.taskService.delete(taskId)
	}
}
