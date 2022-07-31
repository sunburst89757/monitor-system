import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class LayoutShift {
  subtype: string;

  @Prop({ type: String, required: true })
  entryType: string;
    
}

export const LayoutShiftSchema = SchemaFactory.createForClass(LayoutShift);