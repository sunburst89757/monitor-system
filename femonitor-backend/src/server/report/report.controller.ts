import { Controller, Get } from '@nestjs/common';
import { ErrorService } from '../error/error.service';

@Controller('report')
export class ReportController {
    constructor(private readonly errorService:ErrorService ){}

    @Get('getErrors')
    async index(){
        return await this.errorService.getErrorsinfo();
    }
}
