export type IUa = {
  browser: string;
  device: string;
  os: string;
  engine: string;
  brand: any;
};
const parser = require("ua-parser-js");
const sliceVersion = (version?: string, count = 2) => {
  if (!version) return "";
  return version.split(".").slice(0, count).join(".");
};
export const parseUa = (ua: string): IUa => {
  const { browser = {}, os = {}, engine = {}, device = {} } = parser(ua);
  return {
    browser: browser.name
      ? `${browser.name}(${sliceVersion(browser.version)})`
      : "",
    device: device.vendor ? `${device.vendor} - ${device.model || ""}` : "",
    os: os.name ? `${os.name} - ${os.version || ""}` : "",
    engine: engine.name
      ? `${engine.name}(${sliceVersion(engine.version)})`
      : "",
    brand: device.vendor || ""
  };
};
