import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('APP_PORT');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`App started on port ${port}`));
}
bootstrap();
