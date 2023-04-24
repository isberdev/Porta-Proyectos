import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TodoDocument = Todo & Document;
@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  completed: boolean;
}

const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.virtual('id').get(function (this: Document) {
  return this._id.toHexString();
});

export { TodoSchema };
