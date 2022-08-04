import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema,
        collection:'user'
      }
    ])
  ],
  providers: [UserService],
  exports:[UserService],
  controllers: [UserController],
})
export class UserModule {}
