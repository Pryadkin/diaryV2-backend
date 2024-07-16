import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserGameDto {
	name: string
	description: string
	genres: any[]
}

export class UserDto extends UserGameDto {
	@ApiProperty({
		example: 'Anton',
	})
	@IsString()
	@IsOptional()
	firstName?: string

	@ApiProperty({
		example: 'Pryadkin',
	})
	@IsString()
	@IsOptional()
	lastName?: string

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
