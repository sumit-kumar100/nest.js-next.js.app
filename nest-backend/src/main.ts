import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Use the global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform request payload to DTO instance
    }),
  );

  // Setup Swagger documentation
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
