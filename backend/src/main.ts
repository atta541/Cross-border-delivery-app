import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); 
  // app.enableCors({
  //   origin: 'http://192.168.1.11:3000', 
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true, 
  // });

  app.enableCors({
    origin: '*', // Temporarily allow all origins (for development)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
});

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for your project')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
//use 3001 for admin panel
  await app.listen(3001); 
}

bootstrap();

