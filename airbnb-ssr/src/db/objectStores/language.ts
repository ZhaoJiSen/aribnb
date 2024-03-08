type TypeObjectSotre = {
  keyPath: string;
  indexs: Array<string>;
};

const webLang: TypeObjectSotre = {
  keyPath: "id",
  indexs: ["name"],
};

const languageObjectStore = {
  language: webLang,
};

export default languageObjectStore;
