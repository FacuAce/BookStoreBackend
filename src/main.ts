import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppModule.port);
  console.log(`Nest is listen in port ${AppModule.port}`);
}
bootstrap();
