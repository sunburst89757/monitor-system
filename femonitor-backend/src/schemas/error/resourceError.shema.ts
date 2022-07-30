import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ResourceError {
  subtype: String;

  @Prop({ type: String, required: true })
  url: String

  @Prop({ type: String, required: true })
  html: String

  @Prop({ type: String, required: true })
  resourceType: String
}

export const ResourceErrorSchema = SchemaFactory.createForClass(ResourceError);