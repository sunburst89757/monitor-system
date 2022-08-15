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
        let onloadTime = await this.performanceModel.aggregate([
            { $match: { createdAt: { $gte: startTime, $lt: endTime }, subType: 'load' } },
            { $group: { _id: null, averageTime: { $avg: 'startTime' } } },
            { $project: { _id: 0, averageTime: '$averageTime' } }
        ])
        return {
            xhrCount: xhrCount,
            xhrAverageDuration: xhrAverageDuration.length > 0 ? xhrAverageDuration[0].averageDuration : 0,
            xhrSuccess: xhrSuccess,
            domContentLoadedTime: domContentLoadedTime.length > 0 ? domContentLoadedTime[0].averageTime : 0,
            onloadTime: onloadTime.length > 0 ? onloadTime[0].averageTime : 0,
            ttfbTime: ttfbTime.length > 0 ? ttfbTime[0].averageTime : 0
        }
    }

    async getPerformanceList(start, end, pageSize, pageNum, type) {
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: type
        };
        let total = await this.performanceModel.countDocuments(filter);
        return await this.performanceModel.find(filter)
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .then(res => {
                let response = {
                    data: res,
                    total: total,
                    currentPage: pageNum
                }
                return response;
            })
    }

    async getAveLoadTime(start, end, userID){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let filter = {
            userID: userID,
            subType: 'load',
            createdAt: { $gte: startTime, $lt: endTime },
        };
        let loadPages = await this.performanceModel.aggregate([
            {$match:filter},
            {$group:{_id:"$pageURL"}},
        ]);
        let res = [];
        for(let page of loadPages){
            let sum = 0;
            let pages = await this.performanceModel.find({
                pageURL:page._id,
                userID: userID,
                subType: 'load',
                createdAt: { $gte: startTime, $lt: endTime },
            });
            for(let item of pages){
                sum += item.startTime;
            }
            let url = '/' + page._id.split('/').slice(3).join('/').split('?')[0];
            res.push({pageURL: url, time: sum/pages.length});
        }
        return res;
    }

    async getLoadTime(start, end, userID){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let filter = {
            userID: userID,
            subType: 'load',
            createdAt: { $gte: startTime, $lt: endTime },
        };
        let loadPages = await this.performanceModel.aggregate([
            {$match:filter},
            {$project:{"startTime":true}},
        ]);
        let conditions = [
            {name:'1', condition:(time) => time < 1000},
            {name:'5', condition:(time) => time < 5000},
            {name:'10', condition:(time) => time < 10000},
            {name:'30', condition:(time) => time < 30000},
            {name:'other', condition:() => true},
        ];

        let res = {};
        for(let c of conditions) Object.assign(res, {[c.name]:0});

        for(let page of loadPages){
            for(let c of conditions){
                if(c.condition(page.startTime)){
                    res[c.name]++;
                    break;
                }
            }
        }
        return res;
    }

    async getUserLog(start, end, type, userID){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.performanceModel.find({
            subType: type,
            createdAt: {$gte: startTime, $lt: endTime},
            userID:userID,
        });
        return res;
    }
    
    async getFPS(start, end, pageSize, pageNum) {
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let filter = {
            createdAt: { $gte: startTime, $lt: endTime },
            subType: 'fps'
        };
        let total = await this.performanceModel.countDocuments(filter);
        let fpsList = await this.performanceModel.aggregate([
            { $match: filter },
            { $project: { _id: 0, pageURL: '$pageURL', frames: '$frames' } }
        ]).skip((pageNum - 1) * pageSize).limit(pageSize)
        let res = fpsList.map((fps) => {
            let frame = fps.frames;
            return {
                pageURL: fps.pageURL,
                fpsAverage: frame.reduce((acc, val) => acc + val, 0) / frame.length,
                isBlocking: this.isBlocking(frame),
            }
        })
        return {
            data: res,
            total:total,
            currentPage:pageNum,
        };
    }

    isBlocking(fpsList, below = 20, last = 3) {
        let count = 0
        for (let i = 0; i < fpsList.length; i++) {
            if (fpsList[i] && fpsList[i] < below) {
                count++
            } else {
                count = 0
            }

            if (count >= last) {
                return true
            }
        }

        return false
    }
}
