import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ResoureError {
  subtype: String;

  @Prop({ type: String, required: true })
  url: String

  @Prop({ type: String, required: true })
  html: String
}

export const ResoureErrorSchema = SchemaFactory.createForClass(ResoureError);