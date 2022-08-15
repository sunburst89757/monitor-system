import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Navigation {
  @Prop({ type: Number, required: true })
  dns: number;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: Boolean, required: true })
  isCache: boolean;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  protocol: string;

  @Prop({ type: String, required: true })
  sourceType: string;

  @Prop({ type: Number, required: true })
  redirect: number;

  @Prop({ type: Number, required: true })
  resourceSize: number;

  @Prop({ type: Number, required: true })
  responseBodySize: number;

  @Prop({ type: Number, required: true })
  responseHeaderSize: number;

  @Prop({ type: Number, required: true })
  tcp: number;

  @Prop({ type: Number, required: true })
  ttfb: number;

  @Prop({ type: String, required: true })
  pageURL: String;

}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);