import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstInput {
  @Prop({ type: String, required: true })
  name: String;

  @Prop({ type: String, required: true })
  target: String;

  @Prop({ type: String, required: true })
  event: String;

  @Prop({ type: String, required: true })
  pageURL: String;

  @Prop({ type: Number, required: true })
  duration: Number;
}

export const FirstInputSchema = SchemaFactory.createForClass(FirstInput);