import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class JsError {
  subtype: String;

  @Prop({ type: String, required: true })
  msg: String

  @Prop({ type: String, required: true })
  line: String

  @Prop({ type: String, required: true })
  column: String

  @Prop({ type: String, required: true })
  error: String
}

export const JsErrorSchema = SchemaFactory.createForClass(JsError);