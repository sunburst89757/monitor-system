import { Prop } from '@nestjs/mongoose';

export class Common{
    
    @Prop({ type: String, required: true })
    id: String;

    @Prop({ type: String, required: true })
    ip: String;
  
    @Prop({ type: String, required: true })
    appID: String;
  
    @Prop({ type: String })
    userID: String;

    @Prop({ type: String, required: true })
    type: string;
  
    @Prop({ type: Number, required: true })
    startTime: Number;
  
    @Prop({ type: String, required: true })
    pageURL: string;
}