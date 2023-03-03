<!-- @format -->

<template>
  <div>
    <div class="form">
      <el-form ref="formRef" :model="formData" :inline="true">
        <el-form-item label="sn码" prop="sn">
          <el-input v-model="formData.sn" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" html-type="submit" @click="submitForm"
            >查询
          </el-button>
          <el-button style="margin-left: 10px" @click="resetForm"
            >重置
          </el-button>
          <el-button style="margin-left: 10px" @click="clickAdd">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <vxe-grid v-bind="gridOptions">
        <template #handle="{ row }">
          <el-button type="primary" @click="clickEdit(row)"> 编辑 </el-button>
          <el-button
            style="margin-left: 10px"
            type="primary"
            @click="clickDel(row)"
          >
            删除
          </el-button>
        </template>
      </vxe-grid>
    </div>
    <el-dialog
      v-model="showModal"
      title="Basic Modal"
      :destroy-on-close="true"
      @close="closeDialog"
    >
      <el-form
        ref="modelFormRef"
        :model="modelFormData"
        :rules="modelFormRules"
      >
        <el-form-item label="ssn码" prop="sn">
          <el-input v-model="modelFormData.sn" :disabled="!isAdd" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="modelFormData.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="modelFormData.age" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="modelFormData.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="clickAddOk">确定</el-button>
        <el-button @click="clickAddCancel">取消</el-button>
      </template>
    </el-dialog>
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

    const { formRef, formData, formParams, submitForm, resetForm } = useForm();

    const { showModal, modelFormRef, modelFormData, modelFormRules } =
      useModal();

    const { addDB, putDB, delDB, idbList } = useIndexedDB(formParams);

    const { gridOptions } = useTable(idbList);

    const clickAdd = () => {
      showModal.value = true;
      isAdd.value = true;
    };

    const closeDialog = () => {
      modelFormData.sn = '';
      modelFormData.name = '';
      modelFormData.age = '';
      modelFormData.email = '';
    };

    const clickAddCancel = () => {
      showModal.value = false;
      closeDialog();
    };
    const clickAddOk = async () => {
      if (!modelFormRef.value) {
        return;
      }
      await modelFormRef.value.validate((valid, fields) => {
        if (valid) {
          showModal.value = false;
          if (isAdd.value) {
            addDB(toRaw(modelFormData));
          } else {
            putDB(editSn.value, toRaw(modelFormData));
          }
          clickAddCancel();
        } else {
          console.log('error', fields);
        }
      });
    };

    const clickEdit = (row: CustomerType) => {
      isAdd.value = false;
      showModal.value = true;
      editSn.value = row.sn;
      Object.assign(modelFormData, row);
    };

    const clickDel = (row: CustomerType) => {
      delDB(row.sn);
    };

    return {
      formRef,
      formData,
      formParams,
      submitForm,
      resetForm,
      gridOptions,
      showModal,
      modelFormRef,
      modelFormData,
      modelFormRules,
      clickAdd,
      clickAddOk,
      clickAddCancel,
      clickEdit,
      clickDel,
      isAdd,
      closeDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 20px;
}

.table {
  height: calc(100vh - 80px - 40px - 32px - 20px);
}
</style>
