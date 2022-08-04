import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstContentfulPaint {
  @Prop({ type: String })
  entryType: string;
}

export const FirstContentfulPaintSchema = SchemaFactory.createForClass(FirstContentfulPaint);