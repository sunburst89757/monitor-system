import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { Error } from 'src/schemas/error/error.schema';
import { BehaviorService } from '../behavior/behavior.service';
import { UtilsService } from '../utils/utils.service';
@Injectable()
export class ErrorService {

    @Inject(BehaviorService)
    private readonly behaviorService: BehaviorService;

    @Inject(UtilsService)
    private readonly utils: UtilsService;
    constructor(
        @InjectModel(Error.name) private readonly ErrorMoudle: Model<Error>
    ) { }

    async add(reports) {
        for (let report of reports) {
            if (report.errData) report.errData = JSON.stringify(report.errData);
            try {
                await this.ErrorMoudle.create(report);
            } catch (e) {
                console.log('faild to insert report.');
                console.log(e);
            }
        }
    }

    async searchWithPage(qureyError: QueryError, pager: Page) {
        let total: number = await this.ErrorMoudle.countDocuments(qureyError);
        return await this.ErrorMoudle.find(qureyError)
            .skip(pager.currentPage ? (pager.currentPage - 1) * pager.pageSize : 0)
            .limit(pager.pageSize)
            .then(res => {
                let response = {
                    data: res,
                    total: total,
                    currentPage: pager.currentPage
                }
                return response;
            })
            .catch(err => {
                throw err;
            })
    }

    async errOverview(start, end){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let errNum = await this.ErrorMoudle.count({
            subType:['console-error', 'js', 'promise', 'vue'],
            createdAt: {$gte: startTime, $lt:endTime},
        });
        let errUserNum = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {$or:[
                        {subType: 'console-error'},
                        {subType: 'js'},
                        {subType: 'promise'},
                        {subType: 'vue'},
                    ]},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]

            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let pv = await this.behaviorService.getPvTotalCount(startTime, endTime);
        let userNum = await this.behaviorService.getUserNum(startTime, endTime);
        return {
            errNum: errNum,
            errUserNum: errUserNum[0].count,
            pv: pv,
            userNum: userNum,
        };
    }

    async getJsErrors(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'js'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$error',
                num: {$sum:1},
                msg: {$last: '$msg'},
                line: {$last: '$line'},
                column: {$last: '$column'},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'js'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$error',
                num: {$sum:1},
                msg: {$last: '$msg'},
                line: {$last: '$line'},
                column: {$last: '$column'},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ]);
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {error: errItem._id},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}},
            ]);
            let res = await pre;
            
            Object.assign(errItem,{userNum:num[0].count, error: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }

    async getConsoleErrors(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'console-error'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$errData',
                num: {$sum:1},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'console-error'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$errData',
                num: {$sum:1},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ]);
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {errData: errItem._id},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, error: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }

    async getPromiseErrors(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'promise'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$reason',
                num: {$sum:1},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'promise'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$reason',
                num: {$sum:1},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ])
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {reason: errItem._id},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, reason: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }
    async getVueErrors(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'vue'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$error',
                num: {$sum:1},
                info: {$last: '$info'},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'vue'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$error',
                num: {$sum:1},
                info: {$last: '$info'},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ]);
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {error: errItem._id},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, error: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }
    async getResourceErrors(start, end, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'resource'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
                html: {$last: '$html'},
                resourceType: {$last: '$resourceType'},
                createdAt:{$last: '$createdAt'},
                appID: {$last: '$appID'},
                pageURL: {$last: '$pageURL'},
                userID: {$last: '$userID'},
                ip: {$last: '$ip'},
            }},
        ]).skip((pageNum - 1) * pageSize).limit(pageSize);
        let num = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'resource'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$url',
                num: {$sum:1},
                html: {$last: '$html'},
                resourceType: {$last: '$resourceType'},
            }},
            {$group:{_id:null,count:{$sum:1}}},
        ]);
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {url: errItem._id},
                        {createdAt: {$gte: startTime, $lt:endTime}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            Object.assign(errItem,{userNum:num[0].count, error: errItem._id});
            delete errItem._id;
            res.push(errItem);
            return res;
        }, []);
        return {num:num[0]? num[0].count : 0, pageSize:pageSize, pageNum: pageNum, result:errors};
    }
    async getErrorInfo(startTime,endTime){
        let errDatas = await this.ErrorMoudle.aggregate([
            {$match:{
                createdAt: { $gte: startTime, $lt: endTime },
            }},
            {$group:{
                _id:'$subType',
                count: { $sum: 1 },
            }},
            {$project:{
                _id:0,
                type:'$_id',
                count:'$count',
            }}
        ]);
        return errDatas;
    }

    async getScriptPageError(start, end){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let pages = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[{
                    $or:[
                        {subType: 'console-error'},
                        {subType: 'js'},
                        {subType: 'promise'},
                        {subType: 'vue'},
                        ]
                    },
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$pageURL',
                num: {$sum:1},
            }},
        ]).limit(5);
        let res = pages.map((page) => {
            return {
                pageURL:page._id,
                times:page.num,
            };
        });
        return res;
    }

    async getResourtPageError(start, end){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let pages = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'resource'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]
            }},
            {$group:{
                _id: '$pageURL',
                num: {$sum:1},
            }},
        ]).limit(5);
        let res = pages.map((page) => {
            return {
                pageURL:page._id,
                times:page.num,
            };
        });
        return res;
    }

    async getResourceOverview(start, end){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let errNum = await this.ErrorMoudle.count({
            subType:'resource',
            createdAt: {$gte: startTime, $lt:endTime},
        });
        let errUserNum = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'resource'},
                    {createdAt: {$gte: startTime, $lt:endTime}},
                ]

            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let pv = await this.behaviorService.getPvTotalCount(startTime, endTime);
        let userNum = await this.behaviorService.getUserNum(startTime, endTime);
        return {
            errNum: errNum,
            errUserNum: errUserNum[0].count,
            pv: pv,
            userNum: userNum,
        };
    }

    async getErrorCount(start, end){
        let types = ['js', 'promise', 'console-error', 'vue'];
        let res = types.reduce(async (pre, type) => {
            let errNums = await this.getErrorCountByType(start, end, type);
            let res = await pre;
            Object.assign(res, {[type]:errNums});
            return res;
        }, {});
        return res;
    }

    async getErrorCountByType(start, end, type){
        let times = this.utils.splitTime(Number(start), Number(end), 12);
        let res = times.reduce(async (pre, cur) =>{
            let errNum = await this.ErrorMoudle.count({
                subType:type,
                createdAt: {$gte: new Date(cur.startTime), $lt:new Date(cur.endTime)},
            });
            let pv = await this.behaviorService.getPvTotalCount(new Date(cur.startTime), new Date(cur.endTime));
            let res = await pre;
            res.push({errorNum:errNum, pv:pv, rate:Math.floor(errNum/pv*100)/100});
            return res;
        }, []);
        return res;
    }

    async getUserLog(start, end, type, userID, pageSize, pageNum){
        let startTime = new Date(Number(start));
        let endTime = new Date(Number(end));
        let num = await this.ErrorMoudle.find({
            createdAt: {$gte: startTime, $lt: endTime},
            userID:userID,
        }).count();
        let res = await this.ErrorMoudle.find({
            createdAt: {$gte: startTime, $lt: endTime},
            userID:userID,
        }).sort({createdAt:-1}).skip((pageNum - 1) * pageSize).limit(pageSize);;
        return {num:num, pageSize:pageSize, pageNum:pageNum, result:res};
    }
}
