<!-- @format -->

<template>
  <div>
    <div class="form">
      <a-form
        ref="formRef"
        :model="formData"
        layout="inline"
        autocomplete="off"
        @finish="onFinishForm"
        @finishFailed="onFinishFailedForm"
      >
        <a-form-item label="sn码" name="sn">
          <a-input v-model:value="formData.sn" />
        </a-form-item>
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="formData.name" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          <a-button style="margin-left: 10px" @click="clickAdd">新增</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table">
      <vxe-grid v-bind="gridOptions">
        <template #handle="{ row }">
          <a-button type="primary" @click="clickEdit(row)"> 编辑 </a-button>
          <a-button
            style="margin-left: 10px"
            type="primary"
            @click="clickDel(row)"
          >
            删除
          </a-button>
        </template>
      </vxe-grid>
    </div>
    <a-modal
      v-model:visible="showModal"
      title="Basic Modal"
      @ok="clickAddOk"
      @cancel="clickAddCancel"
    >
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="ssn码" v-bind="modalValidateInfos.sn">
          <a-input v-model:value="modelRef.sn" :disabled="!isAdd" />
        </a-form-item>
        <a-form-item label="姓名" v-bind="modalValidateInfos.name">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="年龄" v-bind="modalValidateInfos.age">
          <a-input v-model:value="modelRef.age" />
        </a-form-item>
        <a-form-item label="邮箱" v-bind="modalValidateInfos.email">
          <a-input v-model:value="modelRef.email" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue';
import useIndexedDB, { type CustomerType } from './composables/useIndexedDB';
import useForm from './composables/useForm';
import useModal from './composables/useModal';
import useTable from './composables/useTable';

export default defineComponent({
  name: 'IndexedDB',
  setup() {
    const isAdd = ref(true);
    const editSn = ref('');

    const {
      formRef,
      formData,
      formParams,
      onFinishForm,
      onFinishFailedForm,
      resetForm,
    } = useForm();

    const {
      showModal,
      modelRef,
      modalValidateInfos,
      modalResetFields,
      modalValidate,
    } = useModal();

    const { addDB, putDB, delDB, idbList } = useIndexedDB(formParams);

    const { gridOptions } = useTable(idbList);

    const clickAdd = () => {
      showModal.value = true;
      isAdd.value = true;
    };

    const clickAddOk = () => {
      modalValidate()
        .then(() => {
          showModal.value = false;
          if (isAdd.value) {
            addDB(toRaw(modelRef));
          } else {
            putDB(editSn.value, toRaw(modelRef));
          }
        })
        .catch((err) => console.log('error', err));
    };
    const clickAddCancel = () => {
      modalResetFields();
    };

    const clickEdit = (row: CustomerType) => {
      isAdd.value = false;
      showModal.value = true;
      editSn.value = row.sn;
      Object.assign(modelRef, row);
    };

    const clickDel = (row: CustomerType) => {
      delDB(row.sn);
    };

    return {
      formRef,
      formData,
      formParams,
      onFinishForm,
      onFinishFailedForm,
      resetForm,
      gridOptions,
      showModal,
      modelRef,
      modalValidateInfos,
      clickAdd,
      clickAddOk,
      clickAddCancel,
      clickEdit,
      clickDel,
      isAdd,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 20px;
}

.table {
  height: calc(100vh - 94px - 40px - 32px - 20px);
}
</style>
