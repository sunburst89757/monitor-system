import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Load {
  subtype: string;
 
}

export const LoadSchema = SchemaFactory.createForClass(Load);