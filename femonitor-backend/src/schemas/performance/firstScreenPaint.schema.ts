import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstScreenPaint {
  @Prop({ type: String })
  entryType: string;
}

export const FirstScreenPaintSchema = SchemaFactory.createForClass(FirstScreenPaint);