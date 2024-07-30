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
import { TimeBlockService } from './time-block.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TimeBlockDto } from './dto/time-block.dto'
import { ApiTags } from '@nestjs/swagger'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('user/time-blocks')
@ApiTags('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string, @Body() dto: TimeBlockDto) {
		return this.timeBlockService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	async updateOrder(@Body() dto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(dto.ids)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Body() dto: TimeBlockDto, @Param('id') taskId: string) {
		return this.timeBlockService.update(dto, taskId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.timeBlockService.delete(id)
	}
}
