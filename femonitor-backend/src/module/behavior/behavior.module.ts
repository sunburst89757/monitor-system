import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BehaviorService } from './behavior.service';
import { Behavior, BehaviorSchema } from 'src/schemas/behavior/behavior.schema';
import { ClickSchema} from 'src/schemas/behavior/click.schema';
import { HaschangeSchema} from 'src/schemas/behavior/haschange.schema';
import { PageAccessDurationSchema} from 'src/schemas/behavior/pageAccessDuration.schema';
import { PageAccessHeightSchema} from 'src/schemas/behavior/pageAccessHeight.schema';
import { PVSchema} from 'src/schemas/behavior/pv.schema';
import { ReactRouterChangeSchema } from 'src/schemas/behavior/reactRouterChange.schema';
import { VueRouterChangeSchema } from 'src/schemas/behavior/vueRouterChange.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Behavior.name,
                schema:BehaviorSchema,
                collection:'behavior',
                discriminators:[
                    {name: 'click', schema: ClickSchema},
                    {name: 'haschange',schema:HaschangeSchema},
                    {name: 'page-access-duration',schema:PageAccessDurationSchema},
                    {name: 'page-access-height',schema:PageAccessHeightSchema},
                    {name: 'pv',schema:PVSchema},
                    {name: 'react-router-range',schema:ReactRouterChangeSchema},
                    {name: 'vue-router-change',schema:VueRouterChangeSchema},
                ]
            }
        ])
    ],
    providers:[BehaviorService],
    exports:[BehaviorService]
})
export class BehaviorModule {}
