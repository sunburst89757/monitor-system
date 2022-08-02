import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


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

  @Prop({ type: String, required: true })
  paths: string;

  @Prop({ type: String, required: true })
  outerHtml: string;

  @Prop({ type: String, required: true })
  innerHtml: string;

  @Prop({ type: String, required: true })
  width: string;

  @Prop({ type: String, required: true })
  height: string;

  @Prop({ type: String, required: true })
  viewport: string;
}

export const ClickSchema = SchemaFactory.createForClass(Click);