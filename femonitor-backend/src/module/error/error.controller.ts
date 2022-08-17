import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { ErrorService } from './error.service';

@ApiTags('错误监控')
@Controller('error')
export class ErrorController {
    constructor(private readonly errorService: ErrorService) { }

    @Get('search')
    async search(@Query() query) {
        let map: QueryError = JSON.parse(query.condition);
        let pager: Page = JSON.parse(query.pager);
        return await this.errorService.searchWithPage(map, pager);
    }

    @Get('script/overview')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async overview(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.errOverview(startTime, endTime);
    }

    @Get('script/jsError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    async jsError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? Number(query.pageSize) : 20;
        let pageNum = query.pageNum ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getJsErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/consoleError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    async consoleError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? Number(query.pageSize) : 20;
        let pageNum = query.pageNum ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getConsoleErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/promiseError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    async promiseError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? Number(query.pageSize) : 20;
        let pageNum = query.pageNum ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getPromiseErrors(startTime, endTime, pageSize, pageNum);
    }
    
    @Get('script/vueError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    async vueError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? Number(query.pageSize) : 20;
        let pageNum = query.pageNum ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getVueErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/pageError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async scriptPageError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getScriptPageError(startTime, endTime);
    }

    @Get('script/getErrorCount')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async errorCount(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getErrorCount(startTime, endTime);
    }

    @Get('resource/overview')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async resourceOverview(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourceOverview(startTime, endTime);
    }

    @Get('resource/data')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    async resourceError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? Number(query.pageSize) : 20;
        let pageNum = query.pageNum ? Number(query.pageNum) : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourceErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('resource/pageError')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    async ResourtPageError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourtPageError(startTime, endTime);
    }




}
