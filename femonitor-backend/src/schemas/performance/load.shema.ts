import { Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Load {
  
}

export const LoadSchema = SchemaFactory.createForClass(Load);