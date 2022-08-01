import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Common } from '../common.schema';

@Schema({ discriminatorKey: 'subType',timestamps: true})
export class Behavior extends Common{
  
    @Prop({
      type: String,
      required: true,
      enum:['click','haschange','page-access-duration','page-access-height','pv','react-router-range','vue-router-change'],
    })
    subType: string;

}


export const BehaviorSchema = SchemaFactory.createForClass(Behavior);