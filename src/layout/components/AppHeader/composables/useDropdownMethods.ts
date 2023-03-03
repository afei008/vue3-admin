/** @format */

import { ref, type Ref } from 'vue';
import { useUserStore } from '@/store/modules/user';

interface DropdownMethodsTypes {
  clickMenu: (key: number) => void;
  showDialog: Ref;
  clickConfirm: () => void;
  clickCancel: () => void;
}

export default function useDropdownMethods(): DropdownMethodsTypes {
  const userStore = useUserStore();

  const logout = () => userStore.logout();

  const openUrl = () => {
    const url = 'https://github.com/afei008/vue3-admin';
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
  };

  const showDialog = ref(false);
  const clickConfirm = () => {
    logout();
  };
  const clickCancel = () => {
    showDialog.value = false;
  };

  const clickMenu = (key: number) => {
    switch (key) {
      case 1:
        openUrl();
        break;
      case 0:
        showDialog.value = true;
        break;
      default:
        console.log(`Click on item ${key}`);
    }
  };

  return {
    clickMenu,
    showDialog,
    clickConfirm,
    clickCancel,
  };
}
