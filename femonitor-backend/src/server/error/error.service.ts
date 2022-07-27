import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ErrorService {
    constructor(
        @InjectModel('Errors') private readonly MongodbMoudle
    ){}

    async getErrorsinfo(){
        return await this.MongodbMoudle.find().exec();
    }
}
