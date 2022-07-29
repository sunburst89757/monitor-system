import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ConsoleError {
  subtype: String;

  @Prop({ type: String, required: true })
  errDate: String
}

export const ConsoleErrorSchema = SchemaFactory.createForClass(ConsoleError);