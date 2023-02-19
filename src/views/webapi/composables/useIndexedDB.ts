/** @format */

import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/index';
import { onMounted, reactive, toRefs, watch } from 'vue';

export interface CustomerType {
  sn: string;
  name: string;
  age: string;
  email: string;
}

export default function useIndexedDB(formParams: any) {
  let idb: IDBOpenDBRequest;
  let db: IDBDatabase;
  const storeName = 'customers';

  const state = reactive({
    idbList: [] as CustomerType[],
  });

  const customerData = Array.from({ length: 10 }, (_, index) => {
    return {
      sn: `${index}`,
      name: `name-${index}`,
      age: `${18 + index}`,
      email: `name-${index}@email.com`,
    };
  });

  const createTransaction = (
    name: Array<string>,
    mode?: IDBTransactionMode
  ) => {
    // 此处只操作一个 objectStore，因此统一封装到一起
    return db.transaction(name, mode).objectStore(name[0]);
  };

  const getAllDB = () => {
    createTransaction([storeName]).getAll().onsuccess = (e: Event) => {
      state.idbList = (e.target as IDBRequest).result;
    };
  };

  const getDBBySn = (sn: string | number) => {
    return new Promise((resolve) => {
      createTransaction([storeName]).get(sn).onsuccess = (e: Event) => {
        const { result } = e.target as IDBOpenDBRequest;
        resolve(result);
      };
    });
  };

  const createDB = () => {
    // keyPath：主键
    const objectStore = db.createObjectStore(storeName, { keyPath: 'sn' });
    // 建立索引
    objectStore.createIndex('name', 'name', { unique: false });
    // 建立索引，邮箱不会重复，因此设置唯一
    objectStore.createIndex('email', 'email', { unique: true });
    // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
    objectStore.transaction.oncomplete = () => {
      // 将数据保存到新创建的对象仓库
      const customerObjectStore = createTransaction([storeName], 'readwrite');
      customerData.forEach((customer) => customerObjectStore.add(customer));
    };
  };

  const initIDB = () => {
    if (!window.indexedDB) {
      message.error('您的浏览器不支持 IndexedDB');
      return;
    }
    idb = window.indexedDB.open('myIdb');

    idb.onerror = (e: Event) => {
      console.log('数据库出错', e);
    };
    idb.onsuccess = (e: Event) => {
      console.log('IndexedDB 数据库连接成功', e);
      db = (e.target as IDBOpenDBRequest).result;
      getAllDB();
    };
    idb.onupgradeneeded = (e: Event) => {
      // 初次创建数据库与升级数据库版本会走这里，然后才到 onsuccess 事件
      console.log('初次创建或者升级数据库', e);
      db = (e.target as IDBOpenDBRequest).result;
      createDB();
    };
  };

  const addDB = async (params: CustomerType) => {
    const { sn } = params;
    const result = await getDBBySn(sn);
    if (result) {
      message.error('数据已存在');
      return;
    }
    createTransaction([storeName], 'readwrite').add(params).onsuccess = () =>
      getAllDB();
  };

  const putDB = (sn: string, params: CustomerType) => {
    const objectStore = createTransaction([storeName], 'readwrite');
    const request = objectStore.get(sn);
    request.onsuccess = (e: Event) => {
      // 获取我们想要更新的数据
      const data = (e.target as IDBRequest).result;

      // 更新你想修改的数据
      Object.assign(data, params);

      // 把更新过的对象放回数据库
      const requestUpdate = objectStore.put(data);
      requestUpdate.onsuccess = () => {
        message.success('操作成功');
        getAllDB();
      };
    };
  };

  const delDB = (sn: string) => {
    createTransaction([storeName], 'readwrite').delete(sn).onsuccess = () =>
      getAllDB();
  };

  const getDBByName = (name: string) => {
    return new Promise((resolve) => {
      // 使用 name 索引，必须确保在创建数据库的时候建立了 name 索引
      // 因为 name 非唯一，因此直接使用 get(name) 只会得到一条记录
      // 索引要使用游标遍历
      const list: CustomerType[] = [];
      const index = createTransaction([storeName]).index('name');
      index.openCursor().onsuccess = (e: Event) => {
        const cursor = (e.target as IDBRequest).result;
        if (cursor) {
          if (cursor.key.indexOf(name) > -1) {
            list.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(list);
        }
      };
    });
  };

  const getData = () => {
    // sn 为唯一索引，name 不唯一，因此要分开处理
    const { sn, name } = formParams.value;
    if (sn === '' && name === '') {
      getAllDB();
    } else if (sn !== '' && name === '') {
      getDBBySn(sn).then((res) => {
        state.idbList = [res as CustomerType];
      });
    } else if (sn === '' && name !== '') {
      getDBByName(name).then((res) => {
        state.idbList = res as CustomerType[];
      });
    } else {
      // 当 sn 与 name 都存在时
      getDBByName(name).then((res) => {
        state.idbList = (res as CustomerType[]).filter(
          (item) => item.sn === sn
        );
      });
    }
  };

  watch(
    formParams,
    () => {
      getData();
    },
    { deep: true }
  );

  onMounted(() => {
    initIDB();
  });

  return {
    addDB,
    putDB,
    delDB,
    getAllDB,
    ...toRefs(state),
  };
}
