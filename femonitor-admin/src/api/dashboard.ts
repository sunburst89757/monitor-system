import { myRequest } from "../service";
interface ITime {
  startTime: number;
  endTime: number;
}
interface PVUVList {
  pv: number;
  uv: number;
}
export function getPvUvList(params: ITime) {
  return myRequest<ITime, PVUVList[]>({
    url: "/index/getPvUvList",
    params,
    method: "get"
  });
}
