import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class PV {
  subtype: string;
  
  @Prop({ type: String, required: true })
  referrer: string;
}

export const PVSchema = SchemaFactory.createForClass(PV);