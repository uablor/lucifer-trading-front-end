<template>
  <!-- <a-button @click="composable.open_create.value = true">Open Modal</a-button> -->

  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false">
    <a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('student.level')">
            <a-input v-model:value="composable.form_edit.level" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('student.field_of_study')">
            <a-input v-model:value="composable.form_edit.field_of_study" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('student.work_experience')">
            <a-input v-model:value="composable.form_edit.work_experience" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('student.current_occupation')">
            <a-input v-model:value="composable.form_edit.current_occupation" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item name="status" :label="$t('student.status')">
        <a-select v-model:value="composable.form_edit.status" placeholder="Select status">
          <a-select-option :value="educationStatus.studying">ກຳລັງຮຽນ</a-select-option>
          <a-select-option :value="educationStatus.graduated">ຈົບແລ້ວ</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import type StudentEducationFormService from '../../composables/studenteducation.composable';
import { educationStatus } from '../../domain/models/education.model';

const { composable } = defineProps<{
  composable: StudentEducationFormService
}>();
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  composable.formRef = formRef;
});

</script>
