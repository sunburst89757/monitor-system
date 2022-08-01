import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class PV {
  @Prop({ type: String, required: true })
  referrer: string;
}

export const PVSchema = SchemaFactory.createForClass(PV);