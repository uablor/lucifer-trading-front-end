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
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :sm="12">
          <a-form-item name="title" :label="$t('course.title')">
            <a-input
              v-model:value="composable.form_edit.title"
              size="large"
              placeholder="Enter course title"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="teacher" :label="$t('course.teacher')">
            <a-select
              v-model:value="composable.form_edit.teacher"
              :options="teacherSotre.state.data"
              :field-names="{ label: 'name', value: 'id' }"
              placeholder="Select teacher"
              size="large"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="category" :label="$t('course.category')">
            <a-select
              v-model:value="composable.form_edit.category"
              :options="categoriesStore.state.data"
              :field-names="{ label: 'name', value: 'id' }"
              placeholder="Select category"
              size="large"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="price" :label="$t('course.price')">
            <a-input-number
              v-model:value="composable.form_edit.price"
              size="large"
              style="width: 100%"
              :min="0"
              addon-after="₭"
              placeholder="Enter price"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="max_student" :label="$t('course.max_student')">
            <a-input-number
              v-model:value="composable.form_edit.max_student"
              size="large"
              style="width: 100%"
              :min="1"
              placeholder="Max student"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="duration_hours" :label="$t('course.duration')">
            <a-input-number
              v-model:value="composable.form_edit.duration_hours"
              size="large"
              style="width: 100%"
              :min="1"
              addon-after="hr"
              placeholder="Enter duration"
              :formatter="formatPrice"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="start_date" :label="$t('course.start_date')">
            <a-date-picker
              v-model:value="composable.form_edit.start_date"
              size="large"
              style="width: 100%"
              format="DD-MM-YYYY"
              placeholder="Select start date"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="end_date" :label="$t('course.end_date')">
            <a-date-picker
              v-model:value="composable.form_edit.end_date"
              size="large"
              style="width: 100%"
              format="DD-MM-YYYY"
              placeholder="Select end date"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="registration_start_date" :label="$t('course.registration_start')">
            <a-date-picker
              v-model:value="composable.form_edit.registration_start_date"
              size="large"
              style="width: 100%"
              format="DD-MM-YYYY"
              placeholder="Select reg. start date"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="registration_end_date" :label="$t('course.registration_end')">
            <a-date-picker
              v-model:value="composable.form_edit.registration_end_date"
              size="large"
              style="width: 100%"
              format="DD-MM-YYYY"
              placeholder="Select reg. end date"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item name="status" :label="$t('course.status')">
            <a-select
              v-model:value="composable.form_edit.status"
              :options="[
                { label: 'Open', value: 'open' },
                { label: 'Closed', value: 'closed' }
              ]"
              size="large"
              placeholder="Select status"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item name="description" :label="$t('course.description')">
            <a-textarea
              v-model:value="composable.form_edit.description"
              placeholder="Enter course description"
              rows="4"
            />
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
import { useCourseCategoriesStore } from '@/modules/admin/course_categorie/stores/use-course-categories.store';
import { useTeacherStore } from '@/modules/admin/teacher/stores/use-teacher.store';
import { formatPrice } from '@/shared/utils/formatCurrency';

const categoriesStore = useCourseCategoriesStore();
const teacherSotre = useTeacherStore()
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