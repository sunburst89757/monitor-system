import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { Error } from 'src/schemas/error/error.schema';
import { BehaviorService } from '../behavior/behavior.service';
@Injectable()
export class ErrorService {

    @Inject(BehaviorService)
    private readonly behaviorService: BehaviorService

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

    async errOverview(start: Date){
        let errNum = await this.ErrorMoudle.count({
            subType:['console-error', 'js', 'promise', 'vue'],
            createdAt: {$gte: start},
        });
        let errUserNum = await this.ErrorMoudle.aggregate([
            {$match:{
                $or:[
                    {subType: 'console-error'},
                    {subType: 'js'},
                    {subType: 'promise'},
                    {subType: 'vue'},
                ]
            }},
            {$project:{"userID":true}},
            {$group:{_id:"$userID"}},
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let pv = await this.behaviorService.getPv(start);
        let userNum = await this.behaviorService.getUserNum(start);
        return {
            errNum: errNum,
            errUserNum: errUserNum[0].count,
            pv: pv,
            userNum: userNum,
        };
    }

    async getJsErrors(start: Date){
        let res = await this.ErrorMoudle.aggregate([
            {$match:{
                $and:[
                    {subType: 'js'},
                    {createdAt: {$gte: start}},
                ]
            }},
            {$group:{
                _id: '$error',
                num: {$sum:1},
                msg: {$last: '$msg'},
                line: {$last: '$line'},
                column: {$last: '$column'},
            }},
        ]);
        let errors = await res.reduce(async (pre, errItem) => {
            let userNum = await this.ErrorMoudle.aggregate([
                {$match:{
                    $and:[
                        {error: errItem._id},
                        {createdAt: {$gte: start}},
                    ]
                }},
                {$project:{"userID":true}},
                {$group:{_id:"$userID"}},
                {$group:{_id:null,count:{$sum:1}}}
            ]);
            let res = await pre;
            res.push({
                error: errItem._id,
                times: errItem.num,
                msg: errItem.msg,
                line: errItem.line,
                column: errItem.column,
                userNum: userNum[0].count,
            });
            return res;
        }, []);
        return errors;
    }
}
