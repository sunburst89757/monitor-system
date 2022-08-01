import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class FirstContentfulPaint {
  @Prop({ type: String, required: true })
  entryType: string;
    
}

export const FirstContentfulPaintSchema = SchemaFactory.createForClass(FirstContentfulPaint);