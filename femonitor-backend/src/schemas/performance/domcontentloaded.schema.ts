import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Domcontentloaded {
  subtype: string;
 
}

export const DomcontentloadedSchema = SchemaFactory.createForClass(Domcontentloaded);