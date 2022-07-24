import { IConfig, setConfig } from "./config";
import { handleBehavior } from "./src/handleBehavior";
import { handleError } from "./src/handleError";
import { handlePerformance } from "./src/handlePerformance";

type IMonitor = {
  init: (options: IConfig) => void;
};
const monitor: IMonitor = {
  init(options) {
    setConfig(options);
    // 错误监控
    handleError();
    // 行为监控
    handleBehavior();
    // 性能监控
    handlePerformance();
  }
};
export default monitor;
