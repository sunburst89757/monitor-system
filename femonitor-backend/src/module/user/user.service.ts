import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user/user.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly UserMoudle:Model<User>
    ){}

    async add(user:User){
        const filter={ip:user.ip,id:user.id};
        this.UserMoudle.findOne(filter, (err,_user)=>{
            if(err){
                console.log(err);
            }
            if(_user){
                return ;
            }else{
                this.UserMoudle.create(user);
            }
        });
    }

    async find(createdAt){
        const filter={};
        if(!createdAt){
            createdAt= Date.now();
        }
        let d1=new Date(dayjs(new Date(parseInt(createdAt,10))).format('YYYY-MM-DD'));
        let d2=new Date(dayjs(new Date(parseInt(createdAt,10))).add(1,'days').format('YYYY-MM-DD'));
        Object.assign(filter, {
            createdAt:{$gte:d1,$lt:d2}});
        console.log(Date.now());
        return await this.UserMoudle.find(filter);
    }
}
