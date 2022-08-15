import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LayoutShift {
  @Prop({ type: Object, required: true })
  entries: Object;

  @Prop({ type: Number, required: true })
  value: Number;


}

export const LayoutShiftSchema = SchemaFactory.createForClass(LayoutShift);