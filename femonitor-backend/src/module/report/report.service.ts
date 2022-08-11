import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { lastValueFrom, map } from 'rxjs';
import { ErrorService } from 'src/module/error/error.service';
import { User } from 'src/schemas/user/user.schema';
import { BehaviorService } from '../behavior/behavior.service';
import { PerformanceService } from '../performance/performance.service';
import { UserService } from '../user/user.service';
import { UtilsService } from '../utils/utils.service';
var parser = require('cron-parser');

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
    @Inject(UtilsService)
    private readonly utils: UtilsService

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
        let d1 = new Date(dayjs(new Date(parseInt(createdAt, 10))).add(1, 'days').format('YYYY-MM-DD'));
        let d2 = new Date(dayjs(new Date(parseInt(createdAt, 10))).add(-1, 'days').format('YYYY-MM-DD'));
        let res = await this.behaviorService.getPvUvDayData(d2, d1);
        res.todayIpData = await this.userService.getIPData(d2, d1);
        res.todayCusLeavePercentData = await this.behaviorService.getTodayCusLeavePercentData(d2, d1);
        return res;
    }

    async getPvUvList(startTime, endTime) {
        let times = this.utils.splitTime(Number(startTime), Number(endTime), 20);
        let result = times.reduce(async (pre, cur) =>{
            let item = {
                startTime: cur.startTime,
                endTime: cur.endTime,
                pv: 0,
                uv: 0,
            };
            item.pv = await this.behaviorService.getPvTotalCount(cur.startTime, cur.endTime);
            item.uv = await this.behaviorService.getUvTotalCount(cur.startTime, cur.endTime);
            let res = await pre;
            res.push(item);
            return res;
        }, []);
        return result;
    }

    async getErrorInfo(startTime, endTime) {
        let start = new Date(parseInt(startTime));
        let end = new Date(parseInt(endTime));
        let todayUvCount = await this.behaviorService.getPvTotalCount(start, end);
        let errDatas = await this.errorService.getErrorInfo(start, end);
        let res = { todayUvCount: todayUvCount }
        errDatas.forEach(item => {
            let errKey = item.type + 'Count';
            res[errKey] = item.count;
        })
        return res;
    }

    async getLocationCity(ip: string) {
        let location = await lastValueFrom(this.httpService.get(
            `https://api.map.baidu.com/location/ip?ak=rOXvwq4czOnGE1afnEFqrlhYKN1tYL3q&ip=${ip}&coor=bd09ll`
        ).pipe(
            map((response) => {
                return response.data;
            })
        ));
        if (location.status === 0) {
            return location.content.address_detail.province;
        } else {
            return '';
        }
    }

    timeStampToCron(time_skip) {
        time_skip=time_skip/1000;
        if (time_skip > 0) {
            if(time_skip<60){
                return `*/${time_skip} * * * * *`
            }
            let minute = Math.floor(time_skip / (60))
            if (minute < 60) {
                return `0 */${minute} * * * *`
            }
            let hour = Math.floor(minute / 60);
            if (hour < 24) {
                return `0 0 */${hour} * * *`;
            }
            let day = Math.floor(hour / 24);
            return `0 0 0 */${day}  * *`;
        }
    }
}
