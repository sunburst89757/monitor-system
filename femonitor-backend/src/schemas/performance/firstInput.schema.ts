import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstInput {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({ type: String, required: true })
  event: string;

  @Prop({ type: Number, required: true })
  duration: string;
}

export const FirstInputSchema = SchemaFactory.createForClass(FirstInput);