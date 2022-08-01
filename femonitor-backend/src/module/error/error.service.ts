import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error } from 'src/schemas/error/error.schema';
@Injectable()
export class ErrorService {

    constructor(
        @InjectModel(Error.name) private readonly ErrorMoudle
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
}
