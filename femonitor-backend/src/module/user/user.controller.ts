import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('用户信息')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('getLocationToMap')
    async getLocationToMap(@Query() query){
        return await this.userService.find(query.createdAt);
    }
}
