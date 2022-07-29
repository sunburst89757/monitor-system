import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConsoleError } from './consoleError.schema';
import { ResoureError } from './resourceError.shema';


@Schema({ discriminatorKey: 'subtype' })
export class Error {
  @Prop({ type: String, required: true })
  _id: String;

  @Prop({ type: String, required: true })
  type: String;

  @Prop({
    type: String,
    required: true,
    enum: [ConsoleError.name, ResoureError.name],
  })
  subtype: string;

  @Prop({ type: Date, required: true })
  startTime: Date;

  @Prop({ type: String, required: true })
  pageURL: String;
}

export const ErrorSchema = SchemaFactory.createForClass(Error);