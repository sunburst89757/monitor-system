import { Controller, Get, Post, Body, Req, HttpCode, Headers, RawBodyRequest } from '@nestjs/common';
import { ReportService } from './report.service';
import { Request } from 'express';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService:ReportService){}

    @Get()
    async index(){
        
    }

    @Post()
    @HttpCode(200)
    async reportDate(@Body() body){ 
        let data = JSON.parse(body);
        this.reportService.handle(data);
        return '';
    }

    @Get('testCreate')
    async testCreate(){
        return '';
    }
}
