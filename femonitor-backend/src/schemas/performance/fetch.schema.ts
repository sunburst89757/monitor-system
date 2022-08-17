import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Fetch {
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

  @Prop({ type: Object })
  sendData: object;

  @Prop({ type: Object || String })
  responseData: string | object;
}

export const FetchSchema = SchemaFactory.createForClass(Fetch);
