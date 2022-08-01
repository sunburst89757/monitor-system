import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ReactRouterChange {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  data: string;
}

export const ReactRouterChangeSchema = SchemaFactory.createForClass(ReactRouterChange);