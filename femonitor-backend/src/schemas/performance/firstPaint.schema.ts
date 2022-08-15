import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstPaint {
  @Prop({ type: String })
  entryType: string;
}

export const FirstPaintSchema = SchemaFactory.createForClass(FirstPaint);