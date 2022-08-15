import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class LayoutShift {
  @Prop({ type: Object, required: true })
  entries: Object;

  @Prop({ type: Number, required: true })
  value: Number;

  @Prop({ type: String, required: true })
  pageURL: String;

}

export const LayoutShiftSchema = SchemaFactory.createForClass(LayoutShift);