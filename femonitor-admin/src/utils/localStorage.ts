class Cache {
  setItem(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  getItem(key: string) {
    const val = localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return val;
  }
  clear() {
    localStorage.clear();
  }
}
export const cache = new Cache();
