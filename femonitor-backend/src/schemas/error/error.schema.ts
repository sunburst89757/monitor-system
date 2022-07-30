import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConsoleError } from './consoleError.schema';
import { JsError } from './js.schema';
import { PromiseError } from './promise.schema';
import { ResourceError } from './resourceError.shema';
import { VueError } from './vue.schema';


@Schema({ discriminatorKey: 'subType' })
export class Error {
  @Prop({ type: String, required: true })
  id: String;

  @Prop({ type: String, required: true })
  appID: String;

  @Prop({ type: String, required: true })
  userID: String;

  @Prop({ type: String, required: true })
  type: String;

  @Prop({
    type: String,
    required: true,
    enum: [ConsoleError.name, ResourceError.name, JsError.name, PromiseError.name, VueError.name],
  })
  subType: string;

  @Prop({ type: Date, required: true })
  startTime: Date;

  @Prop({ type: String, required: true })
  pageURL: String;
}

export const ErrorSchema = SchemaFactory.createForClass(Error);