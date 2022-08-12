import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    splitTime(start: number, end: number, n: number){
        let res = [];
        let d = (end - start) / n;
        for(let i=0; i<n; i++){
            res.push({startTime: Math.floor(start), endTime: Math.floor(start+d)});
            start += d;
        }
        return res;
    }
}
