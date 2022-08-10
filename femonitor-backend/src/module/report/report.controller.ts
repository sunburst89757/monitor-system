import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
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

    @Get('getErrorInfo')
    async getErrorInfo(@Query() query){
        return await this.reportService.getErrorInfo(query.startTime,query.endTime);
    }

    @Get('getPvUvList')
    async getPvUvList(@Query() query){
        const startTime=query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        // 获取时间内数据
       return await this.reportService.getPvUvList(startTime,endTime); 
    }

}
