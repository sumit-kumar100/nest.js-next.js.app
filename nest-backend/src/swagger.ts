import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NestJS-NextJS User-CRUD')
    .setDescription(
      'Create, Read, Update, and Delete Users in a NestJS Application.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
