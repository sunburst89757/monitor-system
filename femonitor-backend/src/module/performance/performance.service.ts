import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from 'src/schemas/performance/performance.schema';
import { Xhr } from 'src/schemas/performance/xhr.schema';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PerformanceService {
    @Inject(UtilsService)
    private readonly utils: UtilsService;
    
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

    async getUserLog(start, end, type, userID, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let num = await this.performanceModel.find({
            subType: type,
            createdAt: {$gte: startTime, $lt: endTime},
            userID:userID,
        }).count();
        let res = await this.performanceModel.find({
            subType: type,
            createdAt: {$gte: startTime, $lt: endTime},
            userID:userID,
        }).sort({createdAt:-1}).skip((pageNum - 1) * pageSize).limit(pageSize);;
        return {num:num, pageSize:pageSize, pageNum:pageNum, result:res};
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

    async apiOverview(start, end){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let xhrNum = await this.performanceModel.count({
            subType: 'xhr',
            createdAt: {$gte: startTime, $lt: endTime},
        });
        let xhrErrorNum = await this.performanceModel.count({
            subType: 'xhr',
            success: false,
            createdAt: {$gte: startTime, $lt: endTime},
        });
        let xhrErrorUser = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'xhr'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]

            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let res = {xhr:{total: xhrNum, error: xhrErrorNum, user: xhrErrorUser[0] ? xhrErrorUser[0].count : 0}};
        let fetchNum = await this.performanceModel.count({
            subType: 'fetch',
            createdAt: {$gte: startTime, $lt: endTime},
        });
        let fetchErrorNum = await this.performanceModel.count({
            subType: 'fetch',
            success: false,
            createdAt: {$gte: startTime, $lt: endTime},
        });
        let fetchErrorUser = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'fetch'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]

            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        Object.assign(res, {fetch:{total: fetchNum, error: fetchErrorNum, user: fetchErrorUser[0] ? fetchErrorUser[0].count : 0}});
        let allErrorUser = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {$or:[
                        {subType: 'fetch'},
                        {subType: 'xhr'}
                    ]},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]

            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        Object.assign(res, {all:{total: fetchNum + xhrNum, error: fetchErrorNum+ xhrErrorNum, user: allErrorUser[0]? allErrorUser[0].count: 0}});
        return res;
    }

    async getErrorCountByType(start, end, type){
        let times = this.utils.splitTime(Number(start), Number(end), 12);
        let res = times.reduce(async (pre, cur) =>{
            let errNum = await this.performanceModel.count({
                subType:type,
                success: false,
                createdAt: {$gte: new Date(cur.startTime), $lt:new Date(cur.endTime)},
            });
            let allNum = await this.performanceModel.count({
                subType:type,
                createdAt: {$gte: new Date(cur.startTime), $lt:new Date(cur.endTime)},
            });
            let res = await pre;
            res.push({errorNum:errNum, total:allNum, rate:Math.floor(errNum/allNum*100)/100});
            return res;
        }, []);
        return res;
    }

    async getXhrError(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'xhr'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
                status: {$last: '$status'},
                duration: {$last: '$duration'},
                startTime: {$last: '$startTime'},
                endTime: {$last: '$endTime'},
                method: {$last: '$method'},
                success:{$last: '$success'},
                sendData:{$last: '$sendData'},
                responseData:{$last: '$responseData'},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'xhr'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ])
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.performanceModel.aggregate([
                {$match:{
                    $and:[
                        {subType: 'xhr'},
                        {success: false},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, url: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }

    async getFetchError(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'fetch'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
                duration: {$last: '$duration'},
                startTime: {$last: '$startTime'},
                endTime: {$last: '$endTime'},
                method: {$last: '$method'},
                success:{$last: '$success'},
                sendData:{$last: '$sendData'},
                responseData:{$last: '$responseData'},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.performanceModel.aggregate([
            {$match:{
                $and:[
                    {subType: 'fetch'},
                    {success: false},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ])
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.performanceModel.aggregate([
                {$match:{
                    $and:[
                        {subType: 'fetch'},
                        {success: false},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, url: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }
}
