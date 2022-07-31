import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Fps {
  subtype: string;

  @Prop({ type: String, required: true })
  frames: string;

  
}

export const FpsSchema = SchemaFactory.createForClass(Fps);