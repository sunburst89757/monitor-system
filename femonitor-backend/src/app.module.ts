import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ReportMoudle } from './server/report/report-moudle.module';
import { ReportController } from './server/report/report.controller';
import { ErrorService } from './server/error/error.service';

const DBRootModule = MongooseModule.forRoot('mongodb://localhost/monitor')

@Module({
  imports:[DBRootModule,ReportMoudle],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
