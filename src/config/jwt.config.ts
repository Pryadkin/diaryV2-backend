import type { JwtModuleOptions } from '@nestjs/jwt'
import type { ConfigService } from '@nestjs/config'

export const getJwtConfig = async (
	configService: ConfigService,
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET'),
	signOptions: {
		expiresIn: '1d',
	},
})
