<template>
  <a-button type="primary" @click="service.open_create.value = true">
    <PlusOutlined />{{ $t('student.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('student.modal_title')" @ok="service.create"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('student.submit')" :cancel-text="$t('student.cancel')"
    @cancel="() => (service.open_create.value = false, service.resetForm())">
    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" label="level">
            <a-input v-model:value="service.form_create.level" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" label="field_of_study">
            <a-input v-model:value="service.form_create.field_of_study" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" label="work_experience">
            <a-input v-model:value="service.form_create.work_experience" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" label="current_occupation">
            <a-input v-model:value="service.form_create.current_occupation" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="status" label="status">
        <a-select v-model:value="service.form_create.status" placeholder="Select status">
          <a-select-option :value="educationStatus.studying">ກຳລັງຮຽນ</a-select-option>
          <a-select-option :value="educationStatus.graduated">ຈົບແລ້ວ</a-select-option>
        </a-select>
      </a-form-item>







    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import StudentEducationFormService from '../../composables/studenteducation.composable';
import { educationStatus } from '../../domain/models/education.model';

const service = container.resolve(StudentEducationFormService);

const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  service.formRef = formRef;
});

</script>
