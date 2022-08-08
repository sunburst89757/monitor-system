import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    id: String;

    @Prop({ type: String, required: true })
    ip: String;

    @Prop({ type: String })
    userID: String;

    @Prop({ type: String })
    city: String;
}
export const UserSchema = SchemaFactory.createForClass(User);