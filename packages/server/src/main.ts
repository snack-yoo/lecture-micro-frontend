import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppExceptionFilter} from "./exception/AppExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppExceptionFilter());
  await app.listen(3000);
}
bootstrap();
