import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LargestContentfulPaint {
  @Prop({ type: String, required: true })
  entryType: String;
  
  @Prop({ type: Number, required: true })
  renderTime: number;

  
}

export const LargestContentfulPaintSchema = SchemaFactory.createForClass(LargestContentfulPaint);