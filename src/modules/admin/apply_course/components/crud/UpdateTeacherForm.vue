<template>
  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false" width="500px">

  <a-form
      ref="formRef"
      :model="composable.form_edit"
      :rules="composable.rules"
      layout="vertical"
      class="course-form"
    >
      <a-row :gutter="[16, 16]">
        <!-- Reason -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="title" :label="$t('course.title')">
            <a-input
              v-model:value="composable.form_edit.reason"
              size="large"
              :placeholder="$t('course.enter_title')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Teacher -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="teacher" :label="$t('course.teacher')">
            <a-select
              v-model:value="composable.form_edit.student"
              :options="studentSotre.state.data"
              :field-names="{ label: 'name', value: 'id' }"
              size="large"
              :placeholder="$t('course.select_teacher')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Course Category -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="category" :label="$t('course.category')">
            <a-select
              v-model:value="composable.form_edit.course"
              :options="courseStore.state.data"
              :field-names="{ label: 'title', value: 'id' }"
              size="large"
              :placeholder="$t('course.select_category')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Status -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="status" :label="$t('course.status')">
            <a-select
              v-model:value="composable.form_edit.status"
              size="large"
              :placeholder="$t('course.select_status')"
              allow-clear
            >
              <a-select-option :value="ApplyCourseStatus.APPROVED">
                {{ $t('course.status_approved') }}
              </a-select-option>
              <a-select-option :value="ApplyCourseStatus.PENDING">
                {{ $t('course.status_pending') }}
              </a-select-option>
              <a-select-option :value="ApplyCourseStatus.REJECTED">
                {{ $t('course.status_rejected') }}
              </a-select-option>
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

import { useCourseStore } from '@/modules/admin/course/stores/use-Course.store';
import { useCustomerStore } from '@/modules/admin/student/stores/student.store';
import { ApplyCourseStatus } from '../../domain/models/apply_course.model';

const courseStore = useCourseStore();
const studentSotre = useCustomerStore()
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