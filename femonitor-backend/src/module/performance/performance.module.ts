import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Collection } from 'mongoose';
import { PerformanceService } from './performance.service';
import { PerformanceSchema } from 'src/schemas/performance/performance.schema';
import { DomcontentloadedSchema } from 'src/schemas/performance/domcontentloaded.schema';
import { FetchSchema } from 'src/schemas/performance/fetch.schema';
import { FirstContentfulPaintSchema} from 'src/schemas/performance/firstContentfulPaint.schema';
import { FirstPaintSchema } from 'src/schemas/performance/firstPaint.schema';
import { FpsSchema} from 'src/schemas/performance/fps.schema';
import { LargestContentfulPaintSchema} from 'src/schemas/performance/largestContenfulPaint.schema';
import { LayoutShiftSchema } from 'src/schemas/performance/layoutShift.schema';
import { LoadSchema} from 'src/schemas/performance/load.shema';
import { XhrSchema } from 'src/schemas/performance/xhr.schema';
import { Performance } from 'src/schemas/performance/performance.schema';
import { NavigationSchema } from 'src/schemas/performance/navigation.schema';
import { FirstScreenPaintSchema } from 'src/schemas/performance/firstScreenPaint.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Performance.name,
                schema: PerformanceSchema,
                collection:'performance',
                discriminators:[
                    {name: 'domcontentloaded', schema: DomcontentloadedSchema},
                    {name: 'fetch', schema: FetchSchema},
                    {name: 'first-contentful-paint', schema: FirstContentfulPaintSchema},
                    {name: 'fps', schema: FpsSchema},
                    {name: 'largest-contentful-paint', schema: LargestContentfulPaintSchema},
                    {name: 'paint', schema: FirstPaintSchema},
                    {name: 'layout-shift', schema: LayoutShiftSchema},
                    {name: 'load', schema: LoadSchema},
                    {name: 'xhr', schema: XhrSchema},
                    {name: 'navigation' ,schema:NavigationSchema},
                    {name:'first-screen-paint',schema:FirstScreenPaintSchema},
                    {name:'first-paint',schema:FirstPaintSchema}
                ],
            }])
    ],
    providers:[PerformanceService],
    exports:[PerformanceService]

})
export class PerformanceModule {}
