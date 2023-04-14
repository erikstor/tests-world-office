import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger()

    app.enableCors();
    app.setGlobalPrefix('api')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )


    await app.listen(process.env.PORT || 3000);
    logger.log(`App running on port ${process.env.DB_NAME}`)
    logger.log(`App running on port ${process.env.DB_PASSWORD}`)
    logger.log(`App running on port ${process.env.DB_HOST}`)
    logger.log(`App running on port ${process.env.DB_PORT}`)
    logger.log(`App running on port ${process.env.DB_USERNAME}`)
    logger.log(`App running on port ${process.env.PORT}`)
}

bootstrap();
