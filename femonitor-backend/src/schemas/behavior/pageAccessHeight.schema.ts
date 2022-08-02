import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class PageAccessHeight {
  @Prop({ type: String, required: true })
  value: string;
}

export const PageAccessHeightSchema = SchemaFactory.createForClass(PageAccessHeight);