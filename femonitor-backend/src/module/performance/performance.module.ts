import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomcontentloadedSchema } from 'src/schemas/performance/domcontentloaded.schema';
import { FetchSchema } from 'src/schemas/performance/fetch.schema';
import { FirstContentfulPaintSchema } from 'src/schemas/performance/firstContentfulPaint.schema';
import { FirstInputSchema } from 'src/schemas/performance/firstInput.schema';
import { FirstPaintSchema } from 'src/schemas/performance/firstPaint.schema';
import { FirstScreenPaintSchema } from 'src/schemas/performance/firstScreenPaint.schema';
import { FpsSchema } from 'src/schemas/performance/fps.schema';
import { LargestContentfulPaintSchema } from 'src/schemas/performance/largestContenfulPaint.schema';
import { LayoutShiftSchema } from 'src/schemas/performance/layoutShift.schema';
import { LoadSchema } from 'src/schemas/performance/load.shema';
import { NavigationSchema } from 'src/schemas/performance/navigation.schema';
import { VueRouterSchema } from 'src/schemas/performance/onVueRouter.schema';
import { Performance, PerformanceSchema } from 'src/schemas/performance/performance.schema';
import { ResourceSchema } from 'src/schemas/performance/resource.schema';
import { XhrSchema } from 'src/schemas/performance/xhr.schema';
import { UtilsModule } from '../utils/utils.module';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Performance.name,
                schema: PerformanceSchema,
                collection: 'performance',
                discriminators: [
                    { name: 'domcontentloaded', schema: DomcontentloadedSchema },
                    { name: 'fetch', schema: FetchSchema },
                    { name: 'first-contentful-paint', schema: FirstContentfulPaintSchema },
                    { name: 'fps', schema: FpsSchema },
                    { name: 'largest-contentful-paint', schema: LargestContentfulPaintSchema },
                    { name: 'paint', schema: FirstPaintSchema },
                    { name: 'layout-shift', schema: LayoutShiftSchema },
                    { name: 'load', schema: LoadSchema },
                    { name: 'xhr', schema: XhrSchema },
                    { name: 'navigation', schema: NavigationSchema },
                    { name: 'first-screen-paint', schema: FirstScreenPaintSchema },
                    { name: 'first-paint', schema: FirstPaintSchema },
                    { name: 'first-input', schema: FirstInputSchema },
                    { name: 'resource', schema: ResourceSchema },
                    { name: 'vue-router-change-paint', schema: VueRouterSchema }
                ],
            }]),
            UtilsModule,
    ],
    providers: [PerformanceService],
    exports: [PerformanceService],
    controllers: [PerformanceController]

})
export class PerformanceModule { }
