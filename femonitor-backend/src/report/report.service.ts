import { Inject, Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error.service';
@Injectable()
export class ReportService {
    @Inject(ErrorService)
    private readonly ErrorService: ErrorService

    async handle(data){
        if(!data.data.length){
            data.data = [data.data];
        }
        let reports = Array.from(data.data).map((report) => {
            Object.assign(report, {id:data['id'], appID:data['appID'], userID:data['userID']});
            return report;
        })
        this.ErrorService.add(reports.filter(report => report['type'] == 'error'));
    }
}
