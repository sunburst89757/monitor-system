import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Fps {
  @Prop({ type: [Number], required: true })
  frames: [Number];
}

export const FpsSchema = SchemaFactory.createForClass(Fps);