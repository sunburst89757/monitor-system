export class FlowData{
    dayName:string;
    dayCount:number;
}

export class TodayFlowData{
    todayIpData: Array<FlowData>;
    todayPvData: Array<FlowData>;
    todayUvData: Array<FlowData>;
    todayNewData: Array<FlowData>;
    todayCusLeavePercentData:Array<FlowData>;
    constructor(public  yesToday:string,public Today:string){
        this.todayIpData=new Array<FlowData>();
        this.todayIpData=[{dayName:yesToday,dayCount:0},{dayName:Today,dayCount:0}];
        this.todayPvData=new Array<FlowData>();
        this.todayPvData=[{dayName:yesToday,dayCount:0},{dayName:Today,dayCount:0}];
        this.todayUvData=new Array<FlowData>();
        this.todayUvData=[{dayName:yesToday,dayCount:0},{dayName:Today,dayCount:0}];
        this.todayNewData=new Array<FlowData>();
        this.todayNewData=[{dayName:yesToday,dayCount:0},{dayName:Today,dayCount:0}];
        this.todayCusLeavePercentData=new Array<FlowData>();
        this.todayCusLeavePercentData=[{dayName:yesToday,dayCount:0},{dayName:Today,dayCount:0}];
    }
}