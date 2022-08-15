import { Body, Controller, Get, Headers, HttpCode, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { ReportService } from './report.service';

@ApiTags('项目主接口')
@Controller('index')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post('report')
    @HttpCode(200)
    async reportDate(@Body() body, @RealIP() ip: string, @Headers('User-Agent') userAgent: string,) {
        let data = JSON.parse(body);
        data['ip'] = ip;
        data['ua'] = userAgent;
        if(data.userID == '') data.userID = ip;
        this.reportService.handle(data);
        return '';
        
    }

    @Get('getTodayFlowData')
    async getTodayFlowData() {
       return await this.reportService.getTodayFlowData();
    }

    @Get('errorOverView')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async errorOverView(@Query() query){
        const startTime=query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return await this.reportService.getErrorInfo(query.startTime,query.endTime);
    }

    @Get('getPvUvList')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async getPvUvList(@Query() query){
        console.log(query);
        const startTime=query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        // 获取时间内数据
       return await this.reportService.getPvUvList(startTime,endTime); 
    }

    @Get('performanceOverView')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async performanceOverView(@Query() query){
        const startTime=query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return await this.reportService.performanceOverView(startTime,endTime);
    }

    /**
     * 
     * @param query startTime endTime
     * @return 返回pv前5个地区
     */
    @Get('getPriorFlowLocation')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async getPriorFlowLocation(@Query() query){
        const startTime=query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        // pv根据ip分组
        return await this.reportService.getPriorPvCity(startTime,endTime);
    }

    
}
