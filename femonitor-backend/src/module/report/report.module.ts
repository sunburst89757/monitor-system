import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ErrorModule } from 'src/module/error/error.module';
import { BehaviorModule } from '../behavior/behavior.module';
import { PerformanceModule } from '../performance/performance.module';
import { UserModule } from '../user/user.module';
import { UtilsModule } from '../utils/utils.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
@Module({
    imports:[ErrorModule, BehaviorModule, PerformanceModule, UserModule, HttpModule, UtilsModule],
    controllers: [ReportController],
    providers: [ReportService],
  })
export class ReportModule {}
