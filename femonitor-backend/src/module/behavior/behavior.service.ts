import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Behavior } from 'src/schemas/behavior/behavior.schema';

@Injectable()
export class BehaviorService {
    constructor(
        @InjectModel(Behavior.name) private readonly behaviorMoudle:Model<Behavior>
    ){}
}
