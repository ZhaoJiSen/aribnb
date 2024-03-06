export default class DB {
  // 数据库名称
  private dbName: string = "";
  // 数据库对象
  private db: any;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    /**
     * @description 打开数据库
     * 第一个参数为数据库名称，第二个参数为数据库版本，默认为 1
     * open 会返回一个数据库对象，该对象中包含三个方法
     * */
    const request = window.indexedDB.open(this.dbName, 1);

    return new Promise((resolve, reject) => {
      // 数据库打开成功的回调
      request.onsuccess = (e: any) => {
        console.log("数据库打开成功");
        this.db = e.target.result;

        // 需要额外的产出一个 true 使得后续代码可以继续执行
        resolve(true);
      };

      // 数据库打开失败的回调
      request.onerror = (e) => {
        console.log("打开数据库失败");
        reject(e);
      };

      // 数据库升级成功时的回调，第一次打开数据库时，该事件会优先于 onsuccess
      request.onupgradeneeded = (event) => {
        /**
         * @description 创建仓库对象
         *              第一个参数：对象仓库名称，第二个参数：一个对象，为放置仓库中的属性
         *              keypath 为仓库的主键
         * */
        const { result }: any = event.target;
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath,
        });

        /**
         * @description 创建索引
         *              第一个参数：索引名称，第二个参数：索引属性，第三个参数：配置对象
         *              unique：是否唯一
         * */

        // 索引项为非必填，所以需要校验索引是否存在
        if (indexs && indexs.length > 0) {
          indexs?.map((item: string) => {
            store.createIndex(item, item, { unique: false });
          });
        }

        store.transaction.oncomplete = () => {
          console.log("仓库创建成功");
        };
      };
    });
  }

  // 新增数据库
  public updateItem(storeName: string, data: any) {
    /**
     * @description 第一个参数：数据库对象名称（数组），第二个参数：操作模式（只读还是可写）
     * */
    const operation = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);

    // put 接收一个对象，也就是需要插入的数据，返回一个链接对象，同样存在两个事件 success 和 error
    // 由于 put 相同数据会造成错误，所以额外传入一个时间戳属性
    const request = operation.put({
      ...data,
      updateTime: new Date().getTime(),
    });

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log("数据写入/修改成功");
        resolve(true);
      };

      request.onerror = (e: any) => {
        console.log("数据写入/修改失败");
        reject(e);
      };
    });
  }

  // 删除数据
  public deleteItem(storeName: string, key: number | string) {
    const operation = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);

    const request = operation.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (e: any) => {
        console.log("数据删除成功");
        resolve(e);
      };

      request.onerror = (e: any) => {
        console.log("数据删除失败");
        reject(e);
      };
    });
  }

  // 查询数据，查询整个对象仓库的数据和查询某一条的数据
  public seleceAll(storeName: string) {
    const operation = this.db.transaction(storeName).objectStore(storeName);

    const result = operation.getAll();

    return new Promise((resolve, reject) => {
      result.onsuccess = (e: any) => {
        console.log("查询全部数据成功");
        resolve(e.target.result);
      };

      result.onerror = (e: any) => {
        console.log("查询全部数据失败");
        reject(e);
      };
    });
  }

  public selectItem(storeName: string, key: string | number) {
    const operation = this.db.transaction(storeName).objectStore(storeName);

    const result = operation.get(key);

    return new Promise((resolve, reject) => {
      result.onsuccess = (e: any) => {
        console.log("查询单条数据成功");
        resolve(e.target.result);
      };

      result.onerror = (e: any) => {
        console.log("查询单条数据失败");
        reject(e);
      };
    });
  }
}
