import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@ApiProperty({
		example: 'anton@yandex.ru',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: 'Anton',
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		example: '123456',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string

	@ApiProperty({
		example: [],
	})
	games: []
}
