import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class PageAccessHeight {
  subtype: string;
  
  @Prop({ type: String, required: true })
  value: string;
}

export const PageAccessHeightSchema = SchemaFactory.createForClass(PageAccessHeight);