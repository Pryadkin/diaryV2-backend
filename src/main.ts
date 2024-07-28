import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { VersioningType } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({
		credentials: true,
		origin: 'http://localhost:3001',
		exposedHeaders: ['set-cookie'],
	})
	app.setGlobalPrefix('api/')
	app.enableVersioning({
		type: VersioningType.URI,
	})
	app.use(cookieParser())

	const config = new DocumentBuilder()
		.setTitle('DIARY')
		.setVersion('2.0')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document, {
		swaggerOptions: {
			persistAuthorization: true, // добавили
		},
	})
	await app.listen(4020)
}
bootstrap()
