import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Domcontentloaded {
    @Prop({ type: String, required: true })
    pageURL: String;
}

export const DomcontentloadedSchema = SchemaFactory.createForClass(Domcontentloaded);