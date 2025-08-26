<template>
  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false" width="500px">

<a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical" class="completion-form">
      <a-row :gutter="[24, 16]">


        <a-col :xs="24" :sm="12">
          <a-form-item name="apply_courses" :label="$t('completion.apply_course')">
            <a-select v-model:value="composable.form_edit.apply_courses" :options="applyCourseStore.state.data"
              :field-names="{ label: 'reason', value: 'id' }" :placeholder="'ເລືອກຄອສ'" size="large" />
          </a-form-item>
        </a-col>


        <a-col :xs="24" :sm="12">
          <a-form-item name="total_score" :label="$t('completion.total_score')">
            <a-input-number v-model:value="composable.form_edit.total_score" size="large" :min="0" :max="100"
              style="width: 100%" placeholder="Enter score" />
          </a-form-item>
        </a-col>

        <!-- Total Study Hours -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="total_study_hours" :label="$t('completion.total_study_hours')">
            <a-input-number v-model:value="composable.form_edit.total_study_hours" size="large" :min="0" addon-after="hr"
              style="width: 100%" placeholder="Enter study hours" />
          </a-form-item>
        </a-col>

        <!-- Is Certified -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="is_certified" :label="$t('completion.is_certified')">
            <a-switch v-model:checked="composable.form_edit.is_certified" checked-children="Yes"
              un-checked-children="No" />
          </a-form-item>
        </a-col>

        <!-- Completion Date -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="completion_date" :label="$t('completion.completion_date')">
            <a-date-picker v-model:value="composable.form_edit.completion_date" size="large" format="DD-MM-YYYY"
              style="width: 100%" placeholder="Select completion date" />
          </a-form-item>
        </a-col>

        <!-- Certificate Issued Date -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="certificate_issued_date" :label="$t('completion.certificate_issued_date')">
            <a-date-picker v-model:value="composable.form_edit.certificate_issued_date" size="large" format="DD-MM-YYYY"
              style="width: 100%" placeholder="Select certificate issue date" />
          </a-form-item>
        </a-col>

        <!-- Status -->
        <a-col :xs="24">
          <a-form-item name="status" :label="$t('completion.status')">
            <a-select v-model:value="composable.form_edit.status" size="large" placeholder="Select status">
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
import AdminUserFormService from '../../composables/course.composable';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import RoleFormService from '@/modules/admin/role/composables/role.composable';
import { container } from 'tsyringe';
// import { formatPrice } from '@/shared/utils/formatCurrency';
import { CourseCompletionStatus } from '../../domain/models/course_completion.model';
import { useApplyCourseStore } from '@/modules/admin/apply_course/stores/use-Apply-course.store';

const applyCourseStore = useApplyCourseStore()
const roleConposable = container.resolve(RoleFormService)
const { composable } = defineProps<{
  composable: AdminUserFormService
}>();

const formRef = ref<FormInstance | null>(null);


onMounted( async () => {
  composable.formRef = formRef;
  await roleConposable.getPermissions()
});
</script>

<style lang="scss" scoped>
.tags-container {
  min-height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 4px 11px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;

  &:focus-within {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}

.ant-checkbox-group {
  .ant-checkbox-wrapper {
    margin-bottom: 8px;
  }
}

// Style for better spacing in modal
.ant-modal-body {
  .ant-form-item {
    margin-bottom: 16px;
  }
}
</style>