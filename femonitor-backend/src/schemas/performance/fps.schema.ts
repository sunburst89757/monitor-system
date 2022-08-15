import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Fps {
  @Prop({ type: Array, required: true })
  frames: Array<Number>;

  @Prop({ type: String, required: true })
  pageURL: String;

}

export const FpsSchema = SchemaFactory.createForClass(Fps);