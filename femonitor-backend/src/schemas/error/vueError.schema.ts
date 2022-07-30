import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class VueError {

  @Prop({ type: String, required: true })
  info: String

  @Prop({ type: String, required: true })
  error: String
  
}

export const VueErrorSchema = SchemaFactory.createForClass(VueError);