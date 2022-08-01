import { Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class PageAccessDuration {
  
}

export const PageAccessDurationSchema = SchemaFactory.createForClass(PageAccessDuration);