import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorModule } from './module/error/error.module';
import { ReportModule } from './module/report/report.module';
import { UserModule } from './module/user/user.module';


const DBRootModule = MongooseModule.forRoot('mongodb://localhost/monitor')
@Module({
  imports: [DBRootModule, ErrorModule, ReportModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
