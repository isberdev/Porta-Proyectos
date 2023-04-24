import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await new this.todoModel(createTodoDto);
    return todo.save();
  }

  async findAll() {
    return await this.todoModel.find().exec();
  }

  async findOne(id: string) {
    return await this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel
      .findByIdAndUpdate(
        id,
        { title: updateTodoDto.title, completed: updateTodoDto.completed },
        { new: true },
      )
      .exec();
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async remove(id: string) {
    const todo = await this.todoModel.findByIdAndRemove(id).exec();
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
}
