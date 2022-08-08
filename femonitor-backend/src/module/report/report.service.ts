import { Inject, Injectable } from '@nestjs/common';
import { ErrorService } from 'src/module/error/error.service';
import { User } from 'src/schemas/user/user.schema';
import { TodayFlowData } from 'src/vo/todayFllowData';
import { BehaviorService } from '../behavior/behavior.service';
import { PerformanceService } from '../performance/performance.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';


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

    constructor(private readonly httpService: HttpService) { }

    async handle(data) {
        if (!data.data.length) {
            data.data = [data.data];
        }
        let reports = Array.from(data.data).map((report) => {
            Object.assign(report, { id: data['id'], appID: data['appID'], userID: data['userID'], ip: data['ip'] });
            return report;
        })
        this.errorService.add(reports.filter(report => report['type'] == 'error'));
        this.behaviorService.add(reports.filter(report => report['type'] == 'behavior'))
        this.performanceService.add(reports.filter(report => report['type'] == 'performance'))
        let location = await this.getLocationCity(data['ip']);
        let userInfo: User = { id: data['id'], ip: data['ip'], userID: data['userID'], city: location };
        this.userService.add(userInfo);
    }

    async getTodayFlowData(createdAt) {
        if (!createdAt) {
            createdAt = Date.now();
        }
        let d2 = new Date(dayjs(new Date(parseInt(createdAt, 10))).add(1, 'days').format('YYYY-MM-DD'));
        let d3 = new Date(dayjs(new Date(parseInt(createdAt, 10))).add(-1, 'days').format('YYYY-MM-DD'));
        const res: TodayFlowData = await this.behaviorService.getTodayFlowData(d3, d2);
        res.todayIpData = await this.userService.getTodayFlowData(d3, d2);
        return res;
    }

    async getLocationCity(ip: string) {
        const location = await lastValueFrom(this.httpService.get(
            `https://api.map.baidu.com/location/ip?ak=rOXvwq4czOnGE1afnEFqrlhYKN1tYL3q&ip=${ip}&coor=bd09ll`
        ).pipe(
            map((response) => {
                return response.data;
            })
        ));
        console.log(location);
        if (location.status === 0) {
            return location.content.address_detail.province;
        } else {
            return '';
        }
    }
}
