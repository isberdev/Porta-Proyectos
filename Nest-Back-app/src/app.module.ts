import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/codebrains'),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
