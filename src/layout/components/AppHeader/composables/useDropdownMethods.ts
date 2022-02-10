/** @format */

import { useStore } from '@/store';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

interface DropdownMethodsTypes {
  clickMenu: ({ key }: { key: number }) => void;
}

export default function useDropdownMethods(): DropdownMethodsTypes {
  const store = useStore();

  const logout = () => store.dispatch('userState/logout');

  const showModal = () => {
    Modal.confirm({
      title: '退出登录',
      icon: createVNode(QuestionCircleOutlined),
      content: createVNode('div', {}, '确定退出登录吗？'),
      onOk() {
        return logout();
      },
      class: 'test',
    });
  };

  const openUrl = () => {
    const url = 'https://github.com/afei008/vue3-admin';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let a = document.createElement('a') as any;
    a.href = url;
    a.target = '_blank';
    a.click();
    // 手动清掉
    a = null;
  };

  const clickMenu = ({ key }: { key: number }) => {
    switch (key) {
      case 1:
        openUrl();
        break;
      case 0:
        showModal();
        break;
      default:
        console.log(`Click on item ${key}`);
    }
  };

  return {
    clickMenu,
  };
}
