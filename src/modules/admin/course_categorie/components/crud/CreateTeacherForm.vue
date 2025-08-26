<template>

  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('teacher.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('teacher.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')" :cancel-text="$t('common.cancel')"
    width="550px">

    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="student-form">
      <a-form-item name="name" :label="$t('teacher.name')">
        <a-input v-model:value="service.form_create.name" size="large" placeholder="Enter first name">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>
    </a-form>

  </a-modal>

</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import StudentFormService from '../../composables/course-categories.composable';
import {
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

const service = container.resolve(StudentFormService);
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>