import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schema';
import { BehaviorModule } from '../behavior/behavior.module';
import { ErrorModule } from '../error/error.module';
import { PerformanceModule } from '../performance/performance.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema,
        collection:'user'
      }
    ]),
    BehaviorModule,
    PerformanceModule,
    ErrorModule,
  ],
  providers: [UserService],
  exports:[UserService],
  controllers: [UserController],
})
export class UserModule {}
