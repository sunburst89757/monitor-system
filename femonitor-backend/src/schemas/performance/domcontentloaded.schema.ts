import { Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Domcontentloaded {
  
}

export const DomcontentloadedSchema = SchemaFactory.createForClass(Domcontentloaded);