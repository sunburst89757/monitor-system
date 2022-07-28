import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleError, ConsoleErrorSchema } from 'src/schema/consoleError.schema';
import { ErrorSchema } from 'src/schema/error.schema';
import { ResoureError, ResoureErrorSchema } from 'src/schema/resourceError.shema';
import { ErrorService } from '../error/error.service';
import { ReportController } from './report.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Error.name,
                schema: ErrorSchema,
                collection:'error',
                discriminators:[
                    {name: ConsoleError.name, schema: ConsoleErrorSchema},
                    {name: ResoureError.name, schema: ResoureErrorSchema},
                ],
            }
        ])
    ],
    providers:[ErrorService],
    controllers: [ReportController]
})
export class ReportMoudle {}
