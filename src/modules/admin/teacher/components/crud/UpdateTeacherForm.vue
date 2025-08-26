<template>
  <!-- <a-button @click="composable.open_create.value = true">Open Modal</a-button> -->

  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false">

    <a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('student.name')">
            <a-input v-model:value="composable.form_edit.name" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('student.surname')">
            <a-input v-model:value="composable.form_edit.surname" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="experience" :label="$t('student.experience')">
            <a-input v-model:value="composable.form_edit.experience" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="specialization" :label="$t('student.specialization')">
            <a-input v-model:value="composable.form_edit.specialization" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item name="education" :label="$t('student.education')">
        <a-input v-model:value="composable.form_edit.education" />
      </a-form-item>


    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import TeacherFormService from '../../composables/teacher.composable';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const { composable } = defineProps<{
  composable: TeacherFormService
}>();
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  composable.formRef = formRef;
});

</script>
