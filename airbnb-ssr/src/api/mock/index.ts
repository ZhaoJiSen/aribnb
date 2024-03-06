import DB from "../../utils/indexDB";
import request from "./index";

export const getElephant = async () => {
  let airbnb = new DB("airbnb");

  // 此处需要写成异步处理，因为 openStore 的过程是异步的，所以代码不会等待会直接向下执行
  // 去执行 seleceAll 此时由于数据库还未打开还没有数据对象，所以会报错

  await airbnb.openStore("elephant", "id", ["nose", "ear"]);

  const result = await airbnb.seleceAll("elephant").then((res) => {
    return { code: "0", message: "操作成功", result: res };
  });

  console.log(result);
};
