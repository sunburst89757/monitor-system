import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstPaint {
  @Prop({ type: String })
  entryType: string;
  
  @Prop({ type: String, required: true })
  pageURL: String;
}

export const FirstPaintSchema = SchemaFactory.createForClass(FirstPaint);