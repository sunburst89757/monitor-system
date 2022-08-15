import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('用户信息')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('getLocationToMap')
    async getLocationToMap(@Query() query){
        return await this.userService.find(query.createdAt);
    }

    @Get('behavior')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'pageSize',required:false})
    @ApiQuery({name:'pageNum',required:false})
    @ApiQuery({name:'userId',required:false})
    async behavior(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        let pageSize = query.pageSize ? query.pageSize : 20;
        let pageNum = query.pageNum ? query.pageNum : 1;
        let userId = query.userId;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        return this.userService.getBehavior(startTime, endTime, pageSize, pageNum, userId);
    }

    @Get('loadAveTime')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'userId',required:true})
    async aveLoadTime(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        let userId = query.userId;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        if(!userId) throw new Error('userID不能为空');
        return this.userService.getAveLoadTime(startTime, endTime, userId);
    }
    
    @Get('loadTime')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'userId',required:true})
    async loadTime(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        let userId = query.userId;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        if(!userId) throw new Error('userID不能为空');
        return this.userService.getLoadTime(startTime, endTime, userId);
    }

    @Get('userLogs')
    @ApiQuery({name:'endTime',required:true})
    @ApiQuery({name:'startTime',required:true})
    @ApiQuery({name:'userId',required:true})
    @ApiQuery({name:'type',required:true})
    async userLogs(@Query() query){
        let startTime = query.startTime;
        let endTime = query.endTime;
        let userId = query.userId;
        let type = query.type ? query.type : 1;
        if(!startTime||!endTime) throw new Error('开始结束时间不能为空');
        if(!userId) throw new Error('userID不能为空');
        return this.userService.getUserLogs(startTime, endTime, userId, type);
    }

}
