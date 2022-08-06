import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Behavior } from 'src/schemas/behavior/behavior.schema';

@Injectable()
export class BehaviorService {
    constructor(
        @InjectModel(Behavior.name) private readonly behaviorMoudle:Model<Behavior>
    ){}

    async add(reports){
        for(let report of reports){
            console.log(report);
            try{
                await this.behaviorMoudle.create(report);
            } catch(e) {
                console.log('faild to insert report.');
                console.log(e);
            }
            
        }
    }

    async getPv(start: Date){
        return this.behaviorMoudle.count({
            subType: 'pv',
            createdAt: {$gte: start}
        });
    }

    async getUserNum(start: Date){
        let res = await this.behaviorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'pv'},
                    {createdAt: {$gte: start}},
                ]
            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ])
        return res[0].count;
    }
}
