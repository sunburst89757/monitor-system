import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService:ReportService){}

    @Get()
    async index(){
        
    }

    @Get('testCreate')
    async testCreate(){
        let test = await this.reportService.test();
        return [test];
    }
}
