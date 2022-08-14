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
        let userInfo: User = { id: data['id'], ip: data['ip'], userID: data['userID'], city: location, ua: data['ua'] };
        this.userService.add(userInfo);
    }

    async getTodayFlowData() {
        let createdAt = Date.now();
        let endTime = new Date(dayjs(createdAt).add(1, 'days').format('YYYY-MM-DD'));
        let startTime = new Date(dayjs(createdAt).add(-1, 'days').format('YYYY-MM-DD'));
        console.log(startTime, endTime);
        let res = await this.behaviorService.getPvUvDayData(startTime, endTime);
        res.todayIpData = await this.userService.getIPData(startTime, endTime);
        res.todayCusLeavePercentData = await this.behaviorService.getTodayCusLeavePercentData(startTime, endTime);
        return res;
    }

    async getPvUvList(startTime, endTime) {
        let times = this.utils.splitTime(Number(startTime), Number(endTime), 20);
        let result = times.reduce(async (pre, cur) => {
            let start = new Date(cur.startTime);
            let end = new Date(cur.endTime);
            let item = {
                startTime: start,
                endTime: end,
                pv: 0,
                uv: 0,
            };
            item.pv = await this.behaviorService.getPvTotalCount(start, end);
            item.uv = await this.behaviorService.getUvTotalCount(start, end);
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
        const formatToHump = (value) => {
            return value.replace(/\-(\w)/g, (_, letter) => letter.toUpperCase())
        }
        errDatas.forEach(item => {
            let errKey = formatToHump(item.type) + 'Count';
            console.log(formatToHump(item.type));
            res[errKey] = item.count;
        })
        return res;
    }

    async performanceOverView(startTime, endTime) {
        let start = new Date(parseInt(startTime));
        let end = new Date(parseInt(endTime));
        return await this.performanceService.performanceOverView(start, end);
    }

    async getPriorPvCity(startTime, endTime) {
        let start = new Date(parseInt(startTime));
        let end = new Date(parseInt(endTime));
        let pvIps = await this.behaviorService.getPvLocation(start, end);
        let uvIps = await this.behaviorService.getUvLocation(start, end);
        let pvCitys = await this.userService.getCityByIps(pvIps);
        let uvCitys = await this.userService.getCityByIps(uvIps);
        return { pvCitys, uvCitys };
    }

    async getPriorUvCity(startTime, endTime) {
        let start = new Date(parseInt(startTime));
        let end = new Date(parseInt(endTime));
        let ips = await this.behaviorService.getUvLocation(start, end);
        let citys = await this.userService.getCityByIps(ips);
        return citys;
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
}
