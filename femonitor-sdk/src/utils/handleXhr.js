export const urlToJson = (url = window.location.href) => {
  // 箭头函数默认传值为当前页面url
  let obj = {},
    index = url.indexOf("?"), // 看url有没有参数
    params = url.substring(index + 1); // 截取url参数部分 id = 1 & type = 2

  if (index != -1) {
    // 有参数时
    let parr = params.split("&"); // 将参数分割成数组 ["id = 1 ", " type = 2"]
    for (let i of parr) {
      // 遍历数组
      let arr = i.split("="); // 1） i id = 1   arr = [id, 1]  2）i type = 2  arr = [type, 2]
      obj[arr[0]] = arr[1]; // obj[arr[0]] = id, obj.id = 1   obj[arr[0]] = type, obj.type = 2
    }
  }

  return obj;
};
export const handleXhr = (arr) => {
  const targetArr = arr.filter((item) => !!item.method);
  targetArr.forEach((item) => {
    if (item.method === "GET" && item.subType === "xhr") {
      item.sendData = urlToJson(item.url);
    }
  });
  const realArr = arr.filter((item) => !item.method);
  return [...realArr, ...targetArr];
};
