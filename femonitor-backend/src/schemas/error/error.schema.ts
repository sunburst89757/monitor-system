import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    enum: ['console-error', 'resource', 'js', 'promise', 'vue'],
  })
  subType: string;

  @Prop({ type: Date, required: true })
  startTime: Date;

  @Prop({ type: String, required: true })
  pageURL: String;
}

export const ErrorSchema = SchemaFactory.createForClass(Error);