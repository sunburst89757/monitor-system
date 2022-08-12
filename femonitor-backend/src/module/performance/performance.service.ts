import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from 'src/schemas/performance/performance.schema';
import { Xhr } from 'src/schemas/performance/xhr.schema';

@Injectable()
export class PerformanceService {
    constructor(
        @InjectModel(Performance.name) private readonly performanceModel: Model<Performance>
    ) { }

    async add(reports) {
        for (let report of reports) {
            try {
                await this.performanceModel.create(report);
            } catch (e) {
                console.log('faild to insert report.');
                console.log(e);
            }
        }
    }

    async performanceOverView(startTime, endTime) {
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'xhr'
        };
        let xhr: Array<Xhr> = await this.performanceModel.find(filter);
        let xhrCount = xhr.length;
        let xhrAverageDuration = await this.performanceModel.aggregate([
            { $match: filter },
            { $group: { _id: null, averageDuration: { $avg: '$duration' } } },
            { $project: { _id: 0, averageDuration: '$averageDuration' } }
        ]);
        let xhrSuccess = xhr.filter((item) => {
            return item.success;
        }).length;
        let ttfbTime = await this.performanceModel.aggregate([
            { $match: { createdAt: { $gte: startTime, $lt: endTime }, subType: 'navigation' } },
            { $group: { _id: null, averageTime: { $avg: 'startTime' } } },
            { $project: { _id: 0, averageTime: '$averageTime' } }
        ])
        let domContentLoadedTime = await this.performanceModel.aggregate([
            { $match: { createdAt: { $gte: startTime, $lt: endTime }, subType: 'domcontentloaded' } },
            { $group: { _id: null, averageTime: { $avg: 'startTime' } } },
            { $project: { _id: 0, averageTime: '$averageTime' } }
        ])
        let onloadTime=await this.performanceModel.aggregate([
            { $match: { createdAt: { $gte: startTime, $lt: endTime }, subType: 'load' } },
            { $group: { _id: null, averageTime: { $avg: 'startTime' } } },
            { $project: { _id: 0, averageTime: '$averageTime' } }
        ])
        return {
            xhrCount:xhrCount,
            xhrAverageDuration:xhrAverageDuration.length>0?xhrAverageDuration[0].averageDuration:0,
            xhrSuccess:xhrSuccess,
            domContentLoadedTime:domContentLoadedTime.length>0?domContentLoadedTime[0].averageTime:0,
            onloadTime:onloadTime.length>0?onloadTime[0].averageTime:0,
            ttfbTime:ttfbTime.length>0?ttfbTime[0].averageTime:0
        }
    }
}
