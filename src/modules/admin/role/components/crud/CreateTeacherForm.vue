<template>

  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('role.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('role.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')" :cancel-text="$t('common.cancel')"
    width="550px">

    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="student-form">

      <div>
        <h3>
          <UserOutlined />
          {{ $t('role.personal_info') || 'Personal Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="name" :label="$t('role.name')">
              <a-input v-model:value="service.form_create.name" size="large" placeholder="Enter first name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="surname" :label="$t('role.display_name')">
              <a-input v-model:value="service.form_create.display_name" size="large" placeholder="Enter last name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item name="permissions" :label="$t('admin.permissions')">

          <a-select v-model:value="service.form_create.permissions" mode="multiple" :placeholder="'ເລືອກ Permissions'"
            :options="permissionOptions" 
            @change="handleSelectChange"
            :field-names="{ label: 'name', value: 'id' }" style="width: 100%" 
            >
          </a-select>

        </a-form-item>


      </div>





    </a-form>

  </a-modal>

</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import RoleFormService from '../../composables/role.composable';
import {
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

const service = container.resolve(RoleFormService);
const formRef = ref<FormInstance | null>(null);

function handleSelectChange(selected: any[]) {
  if (selected.includes("ALL")) {
    service.form_create.permissions = service.permissions.value.map((p) => p.id);
  }
}

const permissionOptions = computed(() => [
  {
    id: "ALL",
    name: "Select All",
  },
  ...service.permissions.value,
]);

onMounted(async () => {
  service.formRef = formRef;
  await service.getPermissions()
});

</script>

<style scoped lang="scss"></style>