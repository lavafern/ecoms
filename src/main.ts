import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuraion'
import {ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { documentConfig } from 'config/document.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableVersioning({
    // type: VersioningType.URI,
    // defaultVersion: [ '1']
  // })
  app.enableCors({
    credentials: true,
    origin: [configuration.frontendUrl],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())
  const document = SwaggerModule.createDocument(app,documentConfig)
  SwaggerModule.setup('api',app,document)
  await app.listen(configuration.port);
}
bootstrap();
