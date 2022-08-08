import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ErrorModule } from 'src/module/error/error.module';
import { BehaviorModule } from '../behavior/behavior.module';
import { PerformanceModule } from '../performance/performance.module';
import { UserModule } from '../user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { HttpModule } from '@nestjs/axios';
@Module({
    imports:[ErrorModule, BehaviorModule, PerformanceModule,UserModule,HttpModule],
    controllers: [ReportController],
    providers: [ReportService],
  })
export class ReportModule {}
