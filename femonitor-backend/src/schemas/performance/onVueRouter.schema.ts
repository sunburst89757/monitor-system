import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class VueRouter {
    @Prop({ type: Number, required: true })
    duration: Number;

}

export const VueRouterSchema = SchemaFactory.createForClass(VueRouter);