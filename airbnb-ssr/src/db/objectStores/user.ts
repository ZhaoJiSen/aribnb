type TypeObjectSotre = {
  keyPath: string;
  indexs: Array<string>;
};

const webUser: TypeObjectStore = {
  keyPath: "userId",
  indexs: ["mobile", "password", "status"],
};

const userObjectStore = {
  web_user: webUser,
};

export default userObjectStore;
