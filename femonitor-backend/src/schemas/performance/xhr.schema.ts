import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Xhr {
  subtype: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  duration: string;

  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: String, required: true })
  endTime: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  method: string;

  @Prop({ type: String, required: true })
  success: string;

  @Prop({ type: String, required: true })
  sendData: string;

  @Prop({ type: String, required: true })
  responseData: string;
}

export const XhrSchema = SchemaFactory.createForClass(Xhr);