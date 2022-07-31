import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class PageAccessDuration {
  subtype: string; 
}

export const PageAccessDurationSchema = SchemaFactory.createForClass(PageAccessDuration);