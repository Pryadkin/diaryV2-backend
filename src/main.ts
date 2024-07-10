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

	const config = new DocumentBuilder().setTitle('MYG').setVersion('1.0').build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)
	await app.listen(4010)
}
bootstrap()
