import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    async overview(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.errOverview(startTime, endTime);
    }

    @Get('script/jsError')
    async jsError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getJsErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/consoleError')
    async consoleError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getConsoleErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/promiseError')
    async promiseError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getPromiseErrors(startTime, endTime, pageSize, pageNum);
    }
    
    @Get('script/vueError')
    async vueError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getVueErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('script/pageError')
    async scriptPageError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getScriptPageError(startTime, endTime);
    }

    @Get('script/getErrorCount')
    async errorCount(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getErrorCount(startTime, endTime);
    }

    @Get('resource/overview')
    async resourceOverview(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourceOverview(startTime, endTime);
    }

    @Get('resource/data')
    async resourceError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourceErrors(startTime, endTime, pageSize, pageNum);
    }

    @Get('resource/pageError')
    async ResourtPageError(@Query() query){
        const startTime = query.startTime;
        const endTime = query.endTime;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.errorService.getResourtPageError(startTime, endTime);
    }




}
