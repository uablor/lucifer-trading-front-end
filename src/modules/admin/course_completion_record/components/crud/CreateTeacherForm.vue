<template>
  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('course.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('course.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')" :cancel-text="$t('common.cancel')">
    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="completion-form">
      <a-row :gutter="[24, 16]">


        <a-col :xs="24" :sm="12">
          <a-form-item name="apply_courses" :label="$t('completion.apply_course')">
            <a-select v-model:value="service.form_create.apply_courses" :options="applyCourseStore.state.data"
              :field-names="{ label: 'reason', value: 'id' }" :placeholder="'ເລືອກຄອສ'" size="large" />
          </a-form-item>
        </a-col>


        <a-col :xs="24" :sm="12">
          <a-form-item name="total_score" :label="$t('completion.total_score')">
            <a-input-number v-model:value="service.form_create.total_score" size="large" :min="0" :max="100"
              style="width: 100%" placeholder="Enter score" />
          </a-form-item>
        </a-col>

        <!-- Total Study Hours -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="total_study_hours" :label="$t('completion.total_study_hours')">
            <a-input-number v-model:value="service.form_create.total_study_hours" size="large" :min="0" addon-after="hr"
              style="width: 100%" placeholder="Enter study hours" />
          </a-form-item>
        </a-col>

        <!-- Is Certified -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="is_certified" :label="$t('completion.is_certified')">
            <a-switch v-model:checked="service.form_create.is_certified" checked-children="Yes"
              un-checked-children="No" />
          </a-form-item>
        </a-col>

        <!-- Completion Date -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="completion_date" :label="$t('completion.completion_date')">
            <a-date-picker v-model:value="service.form_create.completion_date" size="large" format="DD-MM-YYYY"
              style="width: 100%" placeholder="Select completion date" />
          </a-form-item>
        </a-col>

        <!-- Certificate Issued Date -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="certificate_issued_date" :label="$t('completion.certificate_issued_date')">
            <a-date-picker v-model:value="service.form_create.certificate_issued_date" size="large" format="DD-MM-YYYY"
              style="width: 100%" placeholder="Select certificate issue date" />
          </a-form-item>
        </a-col>

        <!-- Status -->
        <a-col :xs="24">
          <a-form-item name="status" :label="$t('completion.status')">
            <a-select v-model:value="service.form_create.status" size="large" placeholder="Select status">
              <a-select-option :value="CourseCompletionStatus.PASSED">ຜ່ານ</a-select-option>
              <a-select-option :value="CourseCompletionStatus.FAILED">ບໍ່ຜ່ານ</a-select-option>
              <a-select-option :value="CourseCompletionStatus.INCOMPLETED">ຍັງບໍ່ສຳເລັດ</a-select-option>
              <a-select-option :value="CourseCompletionStatus.WITHDRAWN">ຖອນອອກ </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>

  </a-modal>
</template>



<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import UserAdminFormService from '../../composables/course.composable';

import {
  UserAddOutlined,
} from '@ant-design/icons-vue';
// import { useCourseCompletionStore } from '../../stores/use-Couese-Comple.store';
import { useApplyCourseStore } from '@/modules/admin/apply_course/stores/use-Apply-course.store';
import { CourseCompletionStatus } from '../../domain/models/course_completion.model';

// const store = useCourseCompletionStore();
const applyCourseStore = useApplyCourseStore()
const service = container.resolve(UserAdminFormService);
const formRef = ref<FormInstance | null>(null);


onMounted(() => {
  service.formRef = formRef;

});

</script>

<style scoped lang="scss"></style>