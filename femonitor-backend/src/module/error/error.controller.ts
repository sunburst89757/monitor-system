import { Controller, Get, Query } from '@nestjs/common';
import { Page } from 'src/dto/PageDto';
import { QueryError } from 'src/dto/queryErrorDto';
import { ErrorService } from './error.service';

@Controller('error')
export class ErrorController {
    constructor(private readonly errorService:ErrorService){}

    @Get('search')
    async search(@Query() query){
        console.log(query);
        let map:QueryError =JSON.parse(query.condition);
        let pager:Page=JSON.parse(query.pager);
        return await this.errorService.searchWithPage(map,pager);
    }
}
