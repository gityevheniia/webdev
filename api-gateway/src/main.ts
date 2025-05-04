import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Дозволяємо CORS для фронтенду на Vite (localhost:5173)
  app.enableCors({
    origin: 'http://localhost:5173', // конкретний origin краще, ніж '*'
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.setGlobalPrefix('api'); // /api/users/register, etc.
  await app.listen(3000);
}
bootstrap();
