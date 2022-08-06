import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Common } from '../common.schema';

@Schema({ discriminatorKey: 'subType', timestamps: true })
export class Error extends Common{

  @Prop({
    type: String,
    required: true,
    enum: ['console-error', 'resource', 'js', 'promise', 'vue'],
  })
  subType: string;

}

export const ErrorSchema = SchemaFactory.createForClass(Error);