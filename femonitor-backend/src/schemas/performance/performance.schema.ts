import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ discriminatorKey: 'subType',timestamps: true})
export class Performance {

  @Prop({ type: String, required: true })
  type: string;

  @Prop({
    type: String,
    required: true,
    enum:['domcontentloaded','fetch','first-contentful-paint','fps','largest-contentful-paint','paint','layout-shift','load','xhr'],
  })
  subtype: string;

  @Prop({ type: Date, required: true })
  startTime: Date;

  @Prop({ type: String, required: true })
  pageURL: string;
}

export const PerformanceSchema = SchemaFactory.createForClass(Performance);

