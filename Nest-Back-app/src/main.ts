import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//*inicio de la app
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //*swaggger info de back api
  const config = new DocumentBuilder()
    .setTitle('Todolist React/nest/mongo/swagger')
    .setDescription('Api rest Nest Todolist')
    .setVersion('1.0')
    .addTag('endpoint')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //*puerto de escucha y ejecucion
  await app.listen(4000);
}
bootstrap();
