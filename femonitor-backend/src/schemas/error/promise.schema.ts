import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PromiseError {
  subtype: String;

  @Prop({ type: String, required: true })
  reason: String
}

export const PromiseErrorSchema = SchemaFactory.createForClass(PromiseError);