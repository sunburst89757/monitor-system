import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { errorSchema } from 'src/schema/error.schema';
import { ErrorService } from '../error/error.service';
import { ReportController } from './report.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:'Errors',
                schema: errorSchema,
                collection:'error'
            }
        ])
    ],
    providers:[ErrorService],
    controllers: [ReportController]
})
export class ReportMoudle {}
