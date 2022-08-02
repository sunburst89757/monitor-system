import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class PV {
  @Prop({ type: String })
  referrer: string;
}

export const PVSchema = SchemaFactory.createForClass(PV);