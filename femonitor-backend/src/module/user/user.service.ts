import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user/user.schema';
import * as dayjs from 'dayjs';
import { FlowData } from 'src/vo/todayFllowData';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly UserMoudle: Model<User>
    ) { }

    async add(user: User) {
        console.log(user);
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
}
