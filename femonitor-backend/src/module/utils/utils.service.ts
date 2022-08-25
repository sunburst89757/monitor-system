import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { SourceMapConsumer } from 'source-map';

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

    getMapFileContent(url) {
        let path = resolve(`./maps/${url.split('/').pop()}.map`);
        if(existsSync(path)){
            return JSON.parse(readFileSync(path, 'utf-8'));
        }
        return null;
    }

    async getInfoByMap(url, line, col){
        const mapObj = this.getMapFileContent(url);
        if(mapObj){
            const consumer = await new SourceMapConsumer(mapObj);
            const originalInfo = consumer.originalPositionFor({ line: Number(line), column: Number(col)});
            return originalInfo;
        }
        return null;
    }
}
