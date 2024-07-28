import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength,
} from 'class-validator'

export class PomodoroSettingsDto {
	@IsNumber()
	@IsOptional()
	@Min(1)
	workInterval?: number
	description: string

	@IsNumber()
	@IsOptional()
	@Min(1)
	breakInterval?: number

	@IsNumber()
	@IsOptional()
	@Min(1)
	@Max(10)
	intervalsCount?: number
}

export class UserDto extends PomodoroSettingsDto {
	@ApiProperty({
		example: 'Anton',
	})
	@IsString()
	@IsOptional()
	name?: string

	@ApiProperty({
		example: 'anton@yandex.ru',
	})
	@IsEmail()
	@IsOptional()
	email?: string

	@ApiProperty({
		example: '123456',
	})
	@IsString()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	@IsOptional()
	password?: string
}
