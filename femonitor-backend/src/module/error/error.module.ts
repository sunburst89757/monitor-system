import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleErrorSchema } from 'src/schemas/error/consoleError.schema';
import { Error, ErrorSchema } from 'src/schemas/error/error.schema';
import { JsErrorSchema } from 'src/schemas/error/jsError.schema';
import { PromiseErrorSchema } from 'src/schemas/error/promiseError.schema';
import { ResourceErrorSchema } from 'src/schemas/error/resourceError.shema';
import { VueErrorSchema } from 'src/schemas/error/vueError.schema';
import { ErrorService } from './error.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Error.name,
                schema: ErrorSchema,
                collection:'error',
                discriminators:[
                    {name: 'console-error', schema: ConsoleErrorSchema},
                    {name: 'resource', schema: ResourceErrorSchema},
                    {name: 'js', schema: JsErrorSchema},
                    {name: 'promise', schema: PromiseErrorSchema},
                    {name: 'vue', schema: VueErrorSchema},
                ],
            }
        ])
    ],
    providers:[ErrorService],
    exports: [ErrorService],
})
export class ErrorModule {}
