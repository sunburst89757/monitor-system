import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';

@ApiTags('性能监控')
@Controller('performance')
export class PerformanceController {
    constructor(private readonly performanceService:PerformanceService){}

    @Get('getPerformanceList')
    @ApiQuery({name:'type',required:true,description:'获取性能数据类型'})
    @ApiQuery({name:'pageNum',required:true})
    @ApiQuery({name:'pageSize',required:true})
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
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
