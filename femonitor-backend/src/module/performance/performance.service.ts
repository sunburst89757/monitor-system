import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from 'src/schemas/performance/performance.schema';

@Injectable()
export class PerformanceService {
    constructor(
        @InjectModel(Performance.name) private readonly performanceModel:Model<Performance>
    ){}


}
