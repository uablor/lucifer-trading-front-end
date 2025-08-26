<template>
  <!-- <a-button @click="composable.open_create.value = true">Open Modal</a-button> -->

  <a-modal v-model:open="composable.open_edit.value" :title="$t('role.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false">

    <a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('table.name')">
            <a-input v-model:value="composable.form_edit.name" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('table.display_name')">
            <a-input v-model:value="composable.form_edit.display_name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="permissions" :label="$t('table.permissions')">
      <a-select v-model:value="composable.form_edit.permissions" mode="multiple" :placeholder="'ເລືອກ Permissions'"
           :options="permissionOptions" :field-names="{ label: 'name', value: 'id' }"
           @change="handleSelectChange"
           style="width: 100%" :maxTagCount="5" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import roleFormService from '../../composables/role.composable';
import type { FormInstance } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue';

const { composable } = defineProps<{
  composable: roleFormService
}>();
const formRef = ref<FormInstance | null>(null);

function handleSelectChange(selected: any[]) {
  if (selected.includes("ALL")) {
    composable.form_edit.permissions = composable.permissions.value.map((p) => p.id);
  }
}

const permissionOptions = computed(() => [
  {
    id: "ALL",
    name: "Select All",
  },
  ...composable.permissions.value,
]);
onMounted(async () => {
  composable.formRef = formRef;
  await composable.getPermissions()
});


</script>
