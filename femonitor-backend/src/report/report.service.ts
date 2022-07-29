import { Inject, Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error.service';
@Injectable()
export class ReportService {
    @Inject(ErrorService)
    private readonly ErrorService: ErrorService

    async test(){
        const createdError = this.ErrorService.createResoureError();
        return createdError;
    }
}
