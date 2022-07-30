import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ErrorModule } from 'src/error/error.module';
@Module({
    imports:[ErrorModule],
    controllers: [ReportController],
    providers: [ReportService],
  })
export class ReportModule {}
