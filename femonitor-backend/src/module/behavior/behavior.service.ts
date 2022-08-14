import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Behavior } from 'src/schemas/behavior/behavior.schema';
import { FlowData, TodayFlowData } from 'src/vo/todayFllowData';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class BehaviorService {
    @Inject(UtilsService)
    private readonly utils: UtilsService

    constructor(
        @InjectModel(Behavior.name) private readonly behaviorMoudle: Model<Behavior>
    ) { }

    async add(reports) {
        for (let report of reports) {
            try {
                await this.behaviorMoudle.create(report);
            } catch (e) {
                console.log('faild to insert report.');
                console.log(e);
            }

        }
    }

    async getPvTotalCount(start, end) {
        return this.behaviorMoudle.count({
            subType: 'pv',
            createdAt: { $gte: start, $lt: end }
        });
    }

    async getUserNum(startTime, endTime) {
        let res = await this.behaviorMoudle.aggregate([
            {
                $match: {
                    $and: [
                        { subType: 'pv' },
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }
            },
            { $project: { "userID": true } },
            { $group: { _id: "$userID" } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])
        return res[0].count;
    }

    async getPvUvDayData(startTime, endTime) {
        let filterPv = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let aggregate_limit = [
            { $match: filterPv },
            {
                $group: {
                    dayCount: { $sum: 1 },
                    users: { $addToSet: { ip: '$ip', userId: '$userId' } },
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
                    ids: '$users'
                }
            },
        ];
        let flowDatas = await this.behaviorMoudle.aggregate(aggregate_limit);
        let lastDate = new Date(dayjs(startTime).add(-1, 'days').format('YYYY-MM-DD'));
        let filter_last_pv = {
            createdAt: { $gte: lastDate, $lt: startTime },
            subType: 'pv'
        };
        let lastUvDate = await (await this.behaviorMoudle.distinct('ip', filter_last_pv).distinct('userID')).length;
        let res = new TodayFlowData();
        let todayPvData = new Array<FlowData>();
        let todayUvData = new Array<FlowData>();
        let todayNewData = new Array<FlowData>();
        for (let flowData of flowDatas) {
            todayPvData.push({ dayName: flowData.dayName, dayCount: flowData.dayCount });
            todayUvData.push({ dayName: flowData.dayName, dayCount: flowData.ids.length });
            todayNewData.push({ dayName: flowData.dayName, dayCount: (flowData.ids.length - lastUvDate) > 0 ? (flowData.ids.length - lastUvDate) : 0 });
            lastUvDate = flowData.ids.length;
        }
        res.todayPvData = todayPvData;
        res.todayUvData = todayUvData;
        res.todayNewData = todayNewData;
        return res;
    }

    async getTodayCusLeavePercentData(startTime, endTime) {
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let aggregate_limit = [
            { $match: filter },
            {
                $group: {
                    _id: {
                        dayName: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        id: '$id',
                        ip: '$ip',
                        userID: '$userID',
                    },
                    urlPaths: { $push: '$pageURL' },
                }
            },
            {
                $group: {
                    _id: '$_id.dayName',
                    data: {
                        $push: {
                            id: '$_id.id',
                            ip: '$_id.ip',
                            userID: '$_id.userID',
                            urlPaths: '$urlPaths',
                            dayCount: '$dayCount',
                        }
                    },
                    dayCount: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    dayName: '$_id',
                    data: '$data',
                    dayCount: '$dayCount'
                }
            },
        ];
        let uvPathDatas = await this.behaviorMoudle.aggregate(aggregate_limit);
        let todayCusLeavePercentData = new Array<FlowData>();
        for (let uvPathData of uvPathDatas) {
            let cusLeavePercentCount = uvPathData.data.filter((item) => {
                return item.urlPaths.length == 1;
            }).length;
            todayCusLeavePercentData.push({ dayName: uvPathData.dayName, dayCount: cusLeavePercentCount / uvPathData.dayCount });
        }
        return todayCusLeavePercentData;
    }

    async getUvTotalCount(startTime, endTime) {
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let aggregate_limit = [
            { $match: filter },
            {
                $group: {
                    _id: {
                        ip: '$ip',
                        userID: '$userID',
                    },
                },
            }
        ];
        let res = await this.behaviorMoudle.aggregate(aggregate_limit);
        return res.length;
    }

    /**
     * 获取pv前5个地区
     * @param startTime 
     * @param endTime 
     */
    async getPvLocation(startTime, endTime) {
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let pvLocations = await this.behaviorMoudle.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$ip',
                    dayCount: { $sum: 1 },
                }
            },
            { $project: { _id: 0, ip: '$_id' } },
            { $sort: { dayCount: -1 } },
            { $limit: 5 }
        ]);
        return pvLocations;
    }

    /**
       * 获取uv前5个地区
       * @param startTime 
       * @param endTime 
       */
    async getUvLocation(startTime, endTime) {
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'pv'
        };
        let pvLocations = await this.behaviorMoudle.aggregate([
            { $match: filter },
            {
                $group: {
                    _id:{ip:'$ip',userID: '$userID',},
                    dayCount: { $sum: 1 },
                }
            },
            { $project: { _id: 0, ip: '$_id.ip' } },
            { $sort: { dayCount: -1 } },
            { $limit: 5 }
        ]);
        return pvLocations;
    }

}
