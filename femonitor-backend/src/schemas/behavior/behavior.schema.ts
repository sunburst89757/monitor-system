import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ discriminatorKey: 'subType',timestamps: true})
export class Behavior{
  
    @Prop({ type: String, required: true })
    type: string;
  
    @Prop({
      type: String,
      required: true,
      enum:['click','haschange','page-access-duration','page-access-height','pv','react-router-range','vue-router-change'],
    })
    subtype: string;
  
    @Prop({ type: Date, required: true })
    startTime: Date;
  
    @Prop({ type: String, required: true })
    pageURL: string;
}


export const BehaviorSchema = SchemaFactory.createForClass(Behavior);