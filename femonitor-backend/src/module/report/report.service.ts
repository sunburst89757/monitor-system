import { Inject, Injectable } from '@nestjs/common';
import { ErrorService } from 'src/module/error/error.service';
import { User } from 'src/schemas/user/user.schema';
import { BehaviorService } from '../behavior/behavior.service';
import { PerformanceService } from '../performance/performance.service';
import { UserService } from '../user/user.service';
@Injectable()
export class ReportService {
    @Inject(ErrorService)
    private readonly errorService: ErrorService
    @Inject(BehaviorService)
    private readonly behaviorService: BehaviorService
    @Inject(PerformanceService)
    private readonly performanceService: PerformanceService
    @Inject(UserService)
    private readonly userService: UserService
    async handle(data){
        if(!data.data.length){
            data.data = [data.data];
        }
        let reports = Array.from(data.data).map((report) => {
            Object.assign(report, {id:data['id'], appID:data['appID'], userID:data['userID'], ip:data['ip']});
            return report;
        })
        let userInfo:User={id:data['id'],ip:data['ip'],userID:data['userID']};
        this.errorService.add(reports.filter(report => report['type'] == 'error'));
        this.behaviorService.add(reports.filter(report => report['type'] == 'behavior'))
        this.performanceService.add(reports.filter(report => report['type'] == 'performance'))
        this.userService.add(userInfo);
    }
}
