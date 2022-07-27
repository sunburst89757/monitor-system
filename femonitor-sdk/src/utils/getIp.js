var ip = require("ip");
export function getIp() {
  return ip.address();
}
