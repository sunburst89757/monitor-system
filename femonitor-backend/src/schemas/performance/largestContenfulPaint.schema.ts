import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class LargestContentfulPaint {
  subtype: String;

  @Prop({ type: String, required: true })
  entryType: String;
    
}

export const LargestContentfulPaintSchema = SchemaFactory.createForClass(LargestContentfulPaint);