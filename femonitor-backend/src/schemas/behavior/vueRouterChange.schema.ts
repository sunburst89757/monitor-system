import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class VueRouterChange {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Object, required: true })
  data: object;
}

export const VueRouterChangeSchema =
  SchemaFactory.createForClass(VueRouterChange);
