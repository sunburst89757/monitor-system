import { config } from "../../config";
import { report } from "../utils/report";

export function handleError() {
  window.onerror = () => {
    console.log(arguments, "错误监控的结果");
    report(arguments as any);
  };
}
