import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ConsoleError {

  @Prop({ type: String, required: true })
  errData: String
  
}

export const ConsoleErrorSchema = SchemaFactory.createForClass(ConsoleError);