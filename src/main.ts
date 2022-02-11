import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from '../config/configuration';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting global validation inputs
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },

      // Need for error messages
      disableErrorMessages: false,

      // Its better to not display error values
      validationError: {
        value: false,
      },
      transform: true,
    }),
  );

  port = configuration.port;

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  if (configuration.env !== 'PROD') {
    // Enable CORS
    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Auth Service API')
      .setDescription('Auth Service API Documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          name: 'Authorisation',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'JWT',
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(port);
}

bootstrap().then(() => {
  console.info(`
------------
Internal Application Started!
API V1: http://localhost:${port}/
API Docs: http://localhost:${port}/docs
------------
`);
});
