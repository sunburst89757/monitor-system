import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstContentfulPaint {
  @Prop({ type: String })
  entryType: string;

  @Prop({ type: String, required: true })
  pageURL: String;

}

export const FirstContentfulPaintSchema = SchemaFactory.createForClass(FirstContentfulPaint);