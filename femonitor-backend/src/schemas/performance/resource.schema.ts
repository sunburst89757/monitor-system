import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Resource {
    @Prop({ type: String })
    sourceType: string;

    @Prop({ type: Number })
    duration: number;

    @Prop({ type: Number })
    dns: number;

    @Prop({ type: Number })
    tcp: number;

    @Prop({ type: Number })
    udp: number;

    @Prop({ type: Number })
    redirect: number;

    @Prop({ type: Number })
    ttfb: number;

    @Prop({ type: String })
    protocol: string;

    @Prop({ type: Number })
    responseBodySize: number;

    @Prop({ type: Number })
    responseHeaderSize: number;

    @Prop({ type: Number })
    resourceSize: number;

    @Prop({ type: Boolean })
    isCache: boolean;

    @Prop({ type: String, required: true })
    pageURL: String;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);