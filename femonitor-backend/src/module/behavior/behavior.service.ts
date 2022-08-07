import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Behavior } from 'src/schemas/behavior/behavior.schema';
import { FlowData, TodayFlowData } from 'src/vo/todayFllowData';
import * as dayjs from 'dayjs';

@Injectable()
export class BehaviorService {
    constructor(
        @InjectModel(Behavior.name) private readonly behaviorMoudle: Model<Behavior>
    ) { }

    async add(reports) {
        for (let report of reports) {
            console.log(report);
            try {
                await this.behaviorMoudle.create(report);
            } catch (e) {
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


    async getTodayFlowData(startTime, endTime) {
        let filterPv = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let aggregate_limit = [
            { $match: filterPv },
            {
                $group: {
                    dayCount: { $sum: 1 },
                    ids: { $addToSet: { id: '$id' } },
                    _id: {
                        dayName: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    dayName: '$_id.dayName',
                    dayCount: '$dayCount',
                    ids: '$ids'
                }
            },
        ];
        const flowDatas = await this.behaviorMoudle.aggregate(aggregate_limit);
        const res = new TodayFlowData();
        const todayPvData= new Array<FlowData>();
        const todayUvData=new Array<FlowData>();
        for (let flowData  of flowDatas) {
            todayPvData.push({dayName:flowData.dayName,dayCount:flowData.dayCount});
            todayUvData.push({dayName:flowData.dayName,dayCount:flowData.ids.length});
        }
        res.todayPvData = todayPvData;
        res.todayUvData = todayUvData;
        return res;
    }

}
