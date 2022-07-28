import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Error } from 'src/schema/error.schema';
@Injectable()
export class ErrorService {
    constructor(
        @InjectModel(Error.name) private readonly ReportMoudle
    ){}

    async getErrorsinfo(){

    }

    async createConsoleError(){
        const createdError = await this.ReportMoudle.create({
            _id:1,
            type: 'Error',
            subtype: 'ConsoleError',
            startTime: Date.now(),
            pageURL: 'http://test/test',
            errDate: 'test'
        })
        return createdError;
    }

    async createResoureError(){
        const createdError = await this.ReportMoudle.create({
            _id:2,
            type: 'Error',
            subtype: 'ResoureError',
            startTime: Date.now(),
            pageURL: 'http://test/test',
            url: 'http://test1/test1.jpg',
            html: 'testhtml',
        })
        return createdError;
    }
}
