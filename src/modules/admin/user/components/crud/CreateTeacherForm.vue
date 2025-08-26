<template>

  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('common.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('table.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())" :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')"
    :cancel-text="$t('common.cancel')" width="550px">

    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="student-form">

      <div>
        <h3>
          <UserOutlined />
          {{ $t('table.personal_info') || 'Personal Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="name" :label="$t('table.name')">
              <a-input v-model:value="service.form_create.name" size="large" placeholder="Enter first name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="surname" :label="$t('table.surname')">
              <a-input v-model:value="service.form_create.surname" size="large" placeholder="Enter last name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="email" :label="$t('table.email')">
              <a-input v-model:value="service.form_create.email" type="email" size="large"
                placeholder="Enter email address">
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="password" :label="$t('table.password')">
              <a-input-password v-model:value="service.form_create.password" size="large" placeholder="Enter password">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
 

    </a-form>

  </a-modal>

</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import UserAdminFormService from '../../composables/user-admin.composable';
import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons-vue';
// import { useUserAdminStore } from '../../stores/use-useradmin.store';

// const store = useUserAdminStore();
const service = container.resolve(UserAdminFormService);
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>