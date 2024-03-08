import DB from "@/utils/indexDB.ts";

interface IResult {
  code: string;
  message: string;
  success: boolean;
  result: any;
}

const airbnb = new DB("airbnb");

// 设置语言包
export const saveLanguage = async (lang: string) => {
  await airbnb.openStore("language", "id", ["name"]);

  const operator: IResult = await airbnb
    .selectItem("language", 1)
    .then((res) => {
      return {
        code: "0",
        message: "操作成功",
        result: res || null,
        success: true,
      };
    });

  const { success } = operator;
  let obj = {};

  // 数据存在则更新数据，数据不存在新增数据
  if (success) {
    obj = { name: lang, id: 1 };
  } else {
    obj = { name: lang };
  }

  return await airbnb.updateItem("language", obj).then(() => {
    return { code: "0", message: "操作成功", result: null, success: true };
  });
};

// 获取当前语言包
export const getLanguage = async () => {
  await airbnb.openStore("language", "id", ["name"]);

  return await airbnb.selectItem("language", 1).then((res: any) => {
    return {
      code: "0",
      message: "操作成功",
      result: res || null,
      success: true,
    };
  });
};
