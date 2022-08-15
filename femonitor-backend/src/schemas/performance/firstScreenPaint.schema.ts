import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstScreenPaint {
  @Prop({ type: String })
  entryType: string;
  
  @Prop({ type: String, required: true })
  pageURL: String;

}

export const FirstScreenPaintSchema = SchemaFactory.createForClass(FirstScreenPaint);