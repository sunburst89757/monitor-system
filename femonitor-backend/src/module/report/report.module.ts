import { Module } from '@nestjs/common';
import { ErrorModule } from 'src/module/error/error.module';
import { BehaviorModule } from '../behavior/behavior.module';
import { PerformanceModule } from '../performance/performance.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
@Module({
    imports:[ErrorModule, BehaviorModule, PerformanceModule],
    controllers: [ReportController],
    providers: [ReportService],
  })
export class ReportModule {}
