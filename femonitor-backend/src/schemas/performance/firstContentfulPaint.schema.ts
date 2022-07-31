import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class FirstContentfulPaint {
  subtype: string;

  @Prop({ type: String, required: true })
  entryType: string;
    
}

export const FirstContentfulPaintSchema = SchemaFactory.createForClass(FirstContentfulPaint);