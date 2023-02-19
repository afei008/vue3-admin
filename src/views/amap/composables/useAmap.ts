/** @format */

import { ref, onMounted, type Ref } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { onBeforeRouteLeave } from 'vue-router';
import InfoWindow from '../components/InfoWindow';

interface AmapTypes {
  amap: Ref;
  amapInit: () => void;
}

type AMapTypes = any;

export default function useAmap(
  amapOptions: Record<string, unknown>
): AmapTypes {
  const position = [116.401337, 39.907886];
  const amap = ref(null as AMapTypes);
  let marker = null;
  let infoWindow = null as AMapTypes;
  let initing = false;

  const createInfoWindow = (AMap: AMapTypes) => {
    // 构建自定义信息窗体
    infoWindow = new AMap.InfoWindow({
      anchor: 'top-left',
      isCustom: true,
      content: InfoWindow({
        firstName: 'walter',
        lastName: 'white',
        alias: 'heisenberg',
        getInfoWindow: () => infoWindow,
      }),
    });

    infoWindow.open(amap.value, position);
  };

  const createAmap = (AMap: AMapTypes) => {
    amap.value = new AMap.Map('amap', amapOptions);
    marker = new AMap.Marker({ position, map: amap.value });
    marker.on('click', () => {
      infoWindow.open(amap.value, position);
    });
    createInfoWindow(AMap);
  };

  const amapInit = () => {
    if (initing) {
      return;
    }
    initing = true;
    // 因为示例是放到 github.io 上，此处采用直接明文引入的方式，正式开发的时候请按照高德官方文档使用密文引入
    // eslint-disable-next-line no-underscore-dangle
    window._AMapSecurityConfig = {
      securityJsCode: '1ce560052f5de747fde072c5d56cc139',
    };

    AMapLoader.load({
      key: 'fbc9756a8fa8eed439c3818ff2b6300c',
      version: '2.0',
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 版本
        plugins: ['overlay/SimpleMarker'], // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '2.0', // Loca 版本
      },
    })
      .then((AMap) => createAmap(AMap))
      .catch((e: AMapTypes) => console.log(e))
      .finally(() => {
        initing = false;
      });
  };

  const amapDestroy = () => {
    amap.value.destroy();
    amap.value = null;
  };

  onMounted(() => {
    // amapInit();
  });

  onBeforeRouteLeave(() => {
    amapDestroy();
  });

  return {
    amap,
    amapInit,
  };
}
