import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LayoutShift {
  @Prop({ type: Object, required: true })
  entries: Object;
    
}

export const LayoutShiftSchema = SchemaFactory.createForClass(LayoutShift);