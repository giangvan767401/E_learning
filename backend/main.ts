import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix for API consistency
  app.setGlobalPrefix('api');
  
  // Enable CORS for frontend integration
  app.enableCors();

  // Global validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`[NCKH Systems] Backend operational on: http://localhost:${port}/api`);
}
bootstrap();