import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstScreenPaint {
  @Prop({ type: String, required: true })
  entryType: string;
  
  @Prop({ type: String, required: true })
  pageURL: string;
}

export const FirstScreenPaintSchema = SchemaFactory.createForClass(FirstScreenPaint);