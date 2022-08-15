import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Load {
    @Prop({ type: String, required: true })
    pageURL: String;

}

export const LoadSchema = SchemaFactory.createForClass(Load);