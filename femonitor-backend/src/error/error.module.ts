import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportController } from 'src/report/report.controller';
import { ConsoleError, ConsoleErrorSchema } from 'src/schemas/error/consoleError.schema';
import { ErrorSchema, Error } from 'src/schemas/error/error.schema';
import { ResoureError, ResoureErrorSchema } from 'src/schemas/error/resourceError.shema';
import { ErrorService } from './error.service';

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
    exports: [ErrorService],
})
export class ErrorModule {}
