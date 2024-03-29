import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Common } from '../common.schema';

@Schema({ discriminatorKey: 'subType',timestamps: true})
export class Performance extends Common{
  
  @Prop({
    type: String,
    required: true,
    enum:['vue-router-change-paint','domcontentloaded','fetch','first-contentful-paint','fps','largest-contentful-paint','first-paint','layout-shift','load','xhr','navigation','first-screen-paint', 'first-input', 'resource'],
  })
  subType: string;

}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);