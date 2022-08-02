import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Xhr {
  @Prop({ type: Number, required: true })
  status: number;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: Date, required: true })
  startTime: Date;

  @Prop({ type: Date, required: true })
  endTime: Date;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  method: string;

  @Prop({ type: Boolean, required: true })
  success: boolean;

  @Prop({ type: String, required: true })
  sendData: string;

  @Prop({ type: String, required: true })
  responseData: string;
}

export const XhrSchema = SchemaFactory.createForClass(Xhr);