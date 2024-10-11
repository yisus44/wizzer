import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('A Demo API with CRUD functionality')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port, () => {
    const logger = new Logger('Bootstrap');
    logger.log(`Application is listening on port ${port}`);
  });

}
bootstrap();
