import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//
import { AppModule } from './app.module';
import {AppExceptionFilter} from "./shared/exception/AppExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppExceptionFilter());

  const config = new DocumentBuilder()
      .setTitle('Server')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('server')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
