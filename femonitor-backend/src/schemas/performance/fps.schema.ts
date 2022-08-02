import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Fps {
  @Prop({ type: String, required: true })
  frames: string;

  
}

export const FpsSchema = SchemaFactory.createForClass(Fps);