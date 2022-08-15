import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LargestContentfulPaint {
  @Prop({ type: String, required: true })
  entryType: String;
  
  @Prop({ type: Number, required: true })
  renderTime: number;

  @Prop({ type: String, required: true })
  target: String;


}

export const LargestContentfulPaintSchema = SchemaFactory.createForClass(LargestContentfulPaint);