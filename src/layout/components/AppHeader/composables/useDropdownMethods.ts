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
  const clickMenu = ({ key }: { key: number }) => {
    switch (key) {
      case 3:
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
