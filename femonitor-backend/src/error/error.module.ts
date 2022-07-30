import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportController } from 'src/report/report.controller';
import { ConsoleError, ConsoleErrorSchema } from 'src/schemas/error/consoleError.schema';
import { ErrorSchema, Error } from 'src/schemas/error/error.schema';
import { JsError, JsErrorSchema } from 'src/schemas/error/js.schema';
import { PromiseError, PromiseErrorSchema } from 'src/schemas/error/promise.schema';
import { ResourceError, ResourceErrorSchema } from 'src/schemas/error/resourceError.shema';
import { VueError, VueErrorSchema } from 'src/schemas/error/vue.schema';
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
                    {name: ResourceError.name, schema: ResourceErrorSchema},
                    {name: JsError.name, schema: JsErrorSchema},
                    {name: PromiseError.name, schema: PromiseErrorSchema},
                    {name: VueError.name, schema: VueErrorSchema},
                ],
            }
        ])
    ],
    providers:[ErrorService],
    exports: [ErrorService],
})
export class ErrorModule {}
