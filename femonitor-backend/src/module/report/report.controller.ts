import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { TodayFlowData } from 'src/vo/todayFllowData';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get()
    async index() {

    }

    @Post()
    @HttpCode(200)
    async reportDate(@Body() body, @RealIP() ip: string) {
        let data = JSON.parse(body);
        data['ip'] = ip;
        if(data.userID == '') data.userID = ip;
        this.reportService.handle(data);
        return '';
        
    }

    @Get('testCreate')
    async testCreate() {
        return '';
    }

    @Get('getTodayFlowData')
    async getTodayFlowData(@Query() query) {
       return await this.reportService.getTodayFlowData(query.createdAt);
    }
}
