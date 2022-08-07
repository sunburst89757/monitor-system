export class FlowData{
    dayName:string;
    dayCount:number;
}

export class TodayFlowData{
    todayIpData: Array<FlowData>;
    todayPvData: Array<FlowData>;
    todayUvData: Array<FlowData>;
}