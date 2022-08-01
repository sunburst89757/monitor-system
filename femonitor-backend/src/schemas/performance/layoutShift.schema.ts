import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LayoutShift {
  @Prop({ type: String, required: true })
  entryType: string;
    
}

export const LayoutShiftSchema = SchemaFactory.createForClass(LayoutShift);