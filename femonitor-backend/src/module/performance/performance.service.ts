import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from 'src/schemas/performance/performance.schema';

@Injectable()
export class PerformanceService {
    constructor(
        @InjectModel(Performance.name) private readonly performanceModel:Model<Performance>
    ){}

    async add(reports){
        for(let report of reports){
            console.log(report);
            try{
                await this.performanceModel.create(report);
            } catch(e) {
                console.log('faild to insert report.');
                console.log(e);
            }
        }
    }
}
