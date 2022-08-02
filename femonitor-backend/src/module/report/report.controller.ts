import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService:ReportService){}

    @Get()
    async index(){
        
    }

    @Post()
    @HttpCode(200)
    async reportDate(@Body() body, @RealIP() ip: string){ 
        let data = JSON.parse(body);
        data['ip'] = ip;
        this.reportService.handle(data);
        return '';
    }

    @Get('testCreate')
    async testCreate(){
        return '';
    }
}
