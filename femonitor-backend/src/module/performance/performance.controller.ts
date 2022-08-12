import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';

@ApiTags('性能监控')
@Controller('performance')
export class PerformanceController {
    constructor(private readonly performanceService:PerformanceService){}

    @Get('getPerformanceList')
    async getPerformanceList(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        let type=query.type;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        if(!type) throw new Error('类型不能为空')
        return await this.performanceService.getPerformanceList(startTime, endTime, pageSize, pageNum,type);
    }
}
