import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Click {
  subtype: string;

  @Prop({ type: String, required: true })
  top: string;

  @Prop({ type: String, required: true })
  left: string;

  @Prop({ type: String, required: true })
  eventType: string;

  @Prop({ type: String, required: true })
  pageHeight: string;

  @Prop({ type: String, required: true })
  scrollTop: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({ type: Array, required: true })
  paths: Array<String>;

  @Prop({ type: String, required: true })
  outerHTML: string;

  @Prop({ type: String, required: true })
  innerHTML: string;

  @Prop({ type: String, required: true })
  width: string;

  @Prop({ type: String, required: true })
  height: string;

  @Prop({ type: Object, required: true })
  viewport: Object;
}

export const ClickSchema = SchemaFactory.createForClass(Click);