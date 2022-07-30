import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportModule } from './report/report.module';
import { ErrorModule } from './error/error.module';


const DBRootModule = MongooseModule.forRoot('mongodb://localhost/monitor')
@Module({
  imports: [DBRootModule, ErrorModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
