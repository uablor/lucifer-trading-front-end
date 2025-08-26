<template>
  <!-- <a-button @click="composable.open_create.value = true">Open Modal</a-button> -->

  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false">

    <a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical">

          <a-form-item name="name" :label="$t('student.name')">
            <a-input v-model:value="composable.form_edit.name" />
          </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import StudentFormService from '../../composables/course-categories.composable';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const { composable } = defineProps<{
  composable: StudentFormService
}>();
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  composable.formRef = formRef;
});

</script>
