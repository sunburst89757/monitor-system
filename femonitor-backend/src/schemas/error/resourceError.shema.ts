import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ResoureError {
  subtype: String;

  @Prop({ type: String, required: true })
  url: String

  @Prop({ type: String, required: true })
  html: String

  @Prop({ type: String, required: true })
  resoureType: String
}

export const ResoureErrorSchema = SchemaFactory.createForClass(ResoureError);