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
        let pageSize = Number(query.pageSize) ? Number(query.pageSize) : 20;
        let pageNum = Number(query.pageNum) ? Number(query.pageNum) : 1;
        let type=query.type;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        if(!type) throw new Error('类型不能为空')
        return await this.performanceService.getPerformanceList(startTime, endTime, pageSize, pageNum,type);
    }

    @Get('getFPS')
    @ApiQuery({name:'pageNum',required:true,type:Number})
    @ApiQuery({name:'pageSize',required:true,type:Number})
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async getFPS(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = Number(query.pageSize) ? Number(query.pageSize) : 20;
        let pageNum = Number(query.pageNum) ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return await this.performanceService.getFPS(startTime, endTime, pageSize, pageNum);
    }
}
