import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Haschange {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;
 
}

export const HaschangeSchema = SchemaFactory.createForClass(Haschange);