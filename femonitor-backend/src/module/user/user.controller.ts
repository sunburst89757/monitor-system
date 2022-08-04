import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('getLocationToMap')
    async getLocationToMap(@Query() query){
        return await this.userService.find(query.createdAt);
    }
}
