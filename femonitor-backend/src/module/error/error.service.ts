import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { Error } from 'src/schemas/error/error.schema';
@Injectable()
export class ErrorService {

    constructor(
        @InjectModel(Error.name) private readonly ErrorMoudle:Model<Error>
    ){}

    async add(reports){
        for(let report of reports){
            if(report.errData) report.errData = JSON.stringify(report.errData);
            console.log(report);
            try{
                await this.ErrorMoudle.create(report);
            } catch(e) {
                console.log('faild to insert report.');
                console.log(e);
            }
        }
    }

    async searchWithPage(qureyError:QueryError,pager:Page){
        let total:number =await this.ErrorMoudle.countDocuments(qureyError);
        console.log(qureyError);
        return await this.ErrorMoudle.find(qureyError)
        .skip(pager.currentPage?(pager.currentPage-1)*pager.pageSize:0)
        .limit(pager.pageSize)
        .then(res=>{
             let response={
                data:res,
                total:total,
                currentPage:pager.currentPage
             }
             return response;
        })
        .catch(err=>{
            throw err;
        })
    }
}
