import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user/user.schema';
import { FlowData } from 'src/vo/todayFllowData';
import { BehaviorService } from '../behavior/behavior.service';
import { ErrorService } from '../error/error.service';
import { PerformanceService } from '../performance/performance.service';

@Injectable()
export class UserService {

    @Inject(BehaviorService)
    private readonly behaviorService: BehaviorService;
    @Inject(PerformanceService)
    private readonly performanceService: PerformanceService;
    @Inject(ErrorService)
    private readonly errorService: ErrorService;
    constructor(
        @InjectModel(User.name) private readonly UserMoudle: Model<User>
    ) { }

    async add(user: User) {
        let filter = { ip: user.ip, id: user.id };
        this.UserMoudle.findOne(filter, (err, _user) => {
            if (err) {
                console.log(err);
            }
            if (_user) {
                return;
            } else {
                this.UserMoudle.create(user);
            }
        });
    }

    async find(createdAt) {
        if (!createdAt) {
            createdAt = Date.now();
        }
        let d1 = new Date(dayjs(new Date(parseInt(createdAt, 10))).format('YYYY-MM-DD'));
        let d2 = new Date(dayjs(new Date(parseInt(createdAt, 10))).add(1, 'days').format('YYYY-MM-DD'));
        let filter = {
            createdAt: { $gte: d1, $lt: d2 }
        };
        return await this.UserMoudle.find(filter);
    }

    async getIPData(startTime, endTime) {
        let filterIP = {
            createdAt: { $gte: startTime, $lt: endTime },
        };
        let aggregate_limit = [
            { $match: filterIP },
            {
                $group: {
                    _id: {
                        'dayName': { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        'ip': '$ip'
                    },
                }
            },
            {
                $group: {
                    _id: '$_id.dayName',
                    dayCount: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    dayName: '$_id',
                    dayCount: '$dayCount',
                }
            },
        ];
        let flowDatas = await this.UserMoudle.aggregate(aggregate_limit);
        let todayIpData = new Array<FlowData>();
        for (let flowData of flowDatas) {
            todayIpData.push({ dayName: flowData.dayName, dayCount: flowData.dayCount });
        }
        return todayIpData;
    }

    async getCityByIps(ips){
        let filter={
            $or:ips
        };
        return await this.UserMoudle.aggregate([
            {$match:filter},
            {$project:{_id:0,city:'$city'}}
        ]);
    }


    async getBehavior(start, end, pageSize, pageNum, userID){
        let pv = await this.behaviorService.getPageUrlsByUserid(start, end, pageSize, pageNum, userID);
        for(let o of pv.result){
            let user = await this.UserMoudle.findOne({id: o.id});
            Object.assign(o, {ip: user.ip, city:user.city, ua:user.ua});
        }
        return pv;
    }

    async getAveLoadTime(start, end, userID){
        let res = await this.performanceService.getAveLoadTime(start, end, userID);
        return res;
    }

    async getLoadTime(start, end, userID){
        let res = await this.performanceService.getLoadTime(start, end, userID);
        return res;
    }

    async getUserLogs(start, end,userID, type, pageSize, pageNum){
        let logs = {result: []};
        let types = {
            2: ['pv', 'vue-router-change'],
            3: ['console-error', 'resource', 'js', 'promise', 'vue'],
            4: ['xhr', 'fetch'],
            5: ['click'],
        }
        if(type == '1') logs = await this.behaviorService.getUserLogAll(start, end, userID, pageSize, pageNum);
        if(type == '2') logs = await this.behaviorService.getUserLog(start, end, types[2], userID, pageSize, pageNum);
        if(type == '3') logs = await this.errorService.getUserLog(start, end, types[3], userID, pageSize, pageNum);
        if(type == '4') logs = await this.performanceService.getUserLog(start, end, types[4], userID, pageSize, pageNum);
        if(type == '5') logs = await this.behaviorService.getUserLog(start, end, types[5], userID, pageSize, pageNum);
        let getType = function(log){
            for(let t in types){
                if(types[t].includes(log.subType)) return t;
            }
            return 'unknown';
        }
        logs['result'].forEach((log) => {
            return Object.assign(log, {type: getType(log)});
        });
        return logs;
    }
}
