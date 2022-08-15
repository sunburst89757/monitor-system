import { Prop } from '@nestjs/mongoose';

export class Common{
    
    @Prop({ type: String, required: true })
    id: string;

    @Prop({ type: String, required: true })
    ip: string;
  
    @Prop({ type: String, required: true })
    appID: string;
  
    @Prop({ type: String })
    userID: string;

    @Prop({ type: String, required: true })
    type: string;
  
    @Prop({ type: Number, required: true })
    startTime: number;
  
    @Prop({ type: String, required: true })
    pageURL: string;
}