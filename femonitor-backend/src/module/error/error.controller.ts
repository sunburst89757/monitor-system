import { Controller, Get, Query } from '@nestjs/common';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { ErrorService } from './error.service';

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
        let start = this.getStartByDuration(Number(query.duration));
        return this.errorService.errOverview(start);
    }

    @Get('script/jsError')
    async jsError(@Query() query){
        let start = this.getStartByDuration(Number(query.duration));
        return this.errorService.getJsErrors(start);
    }

    getStartByDuration(d: Number){
        let sec;
        switch(d){
            case 1:
                // 1 hour
                sec = 60 * 60;
                break;
            case 2:
                // 12 hours
                sec = 12 * 60 * 60;
                break;
            case 3:
                // 24 hours
                sec = 24 * 60 * 60;
                break;
            case 4:
                // 3 days
                sec = 3 * 24 * 60 * 60;
                break;
            case 5:
                // 1 week
                sec = 7 * 24 * 60 * 60;
                break;
            case 6:
                // 15 days
                sec = 15 * 24 * 60 * 60;
                break;
            default:
                // 1 hour
                sec = 60 * 60
        }
        return new Date(new Date().getTime() - sec * 1000);
    }

}
