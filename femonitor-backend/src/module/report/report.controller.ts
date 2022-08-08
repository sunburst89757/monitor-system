import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { TodayFlowData } from 'src/vo/todayFllowData';
import { ReportService } from './report.service';

@ApiTags('项目主接口')
@Controller('index')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post('report')
    @HttpCode(200)
    async reportDate(@Body() body, @RealIP() ip: string) {
        let data = JSON.parse(body);
        data['ip'] = ip;
        if(data.userID == '') data.userID = ip;
        this.reportService.handle(data);
        return '';
        
    }

    @Get('getTodayFlowData')
    async getTodayFlowData(@Query() query) {
       return await this.reportService.getTodayFlowData(query.createdAt);
    }
}
