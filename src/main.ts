import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain;
  app.enableCors();
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  // @TODO: Fix this app versioning. It is not working properly
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const config = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('Notifications REST API...')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // !TODO: this port must be read from an environment variable
  await app.listen(3000);
}
bootstrap();
