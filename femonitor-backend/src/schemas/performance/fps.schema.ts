import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Fps {
  @Prop({ type: Array, required: true })
  frames: Array<Number>;
}

export const FpsSchema = SchemaFactory.createForClass(Fps);