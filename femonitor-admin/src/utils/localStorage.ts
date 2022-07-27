import { decrypto, encrypto } from "./encrypt";

class Cache {
  setItem(key: string, val: any) {
    localStorage.setItem(key, encrypto(val));
  }
  getItem(key: string) {
    const val = localStorage.getItem(key);
    if (val) {
      return decrypto(val);
    }
    return val;
  }
  clear() {
    localStorage.clear();
  }
}
export const cache = new Cache();
