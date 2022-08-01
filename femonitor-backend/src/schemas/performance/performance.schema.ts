import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Common } from '../common.schema';

@Schema({ discriminatorKey: 'subType',timestamps: true})
export class Performance extends Common{
  
  @Prop({
    type: String,
    required: true,
    enum:['domcontentloaded','fetch','first-contentful-paint','fps','largest-contentful-paint','paint','layout-shift','load','xhr'],
  })
  subType: string;

}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);