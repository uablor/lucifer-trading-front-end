<template>
  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('common.add') }}
  </a-button>

  <a-modal
    v-model:open="service.open_create.value"
    :title="$t('apply_course.modal_title')"
    @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value"
    :ok-text="$t('common.submit')"
    :cancel-text="$t('common.cancel')"
    width="500px"
  >
    <a-form
      ref="formRef"
      :model="service.form_create"
      :rules="service.rules"
      layout="vertical"
      class="course-form"
    >
      <a-row :gutter="[16, 16]">
        <!-- Reason -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="title" :label="$t('apply_course.title')">
            <a-input
              v-model:value="service.form_create.reason"
              size="large"
              :placeholder="$t('apply_course.enter_title')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Teacher -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="teacher" :label="$t('apply_course.teacher')">
            <a-select
              v-model:value="service.form_create.student"
              :options="studentSotre.state.data"
              :field-names="{ label: 'name', value: 'id' }"
              size="large"
              :placeholder="$t('apply_course.select_teacher')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Course Category -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="category" :label="$t('apply_course.category')">
            <a-select
              v-model:value="service.form_create.course"
              :options="courseStore.state.data"
              :field-names="{ label: 'title', value: 'id' }"
              size="large"
              :placeholder="$t('apply_course.select_category')"
              allow-clear
            />
          </a-form-item>
        </a-col>

        <!-- Status -->
        <a-col :xs="24" :sm="12">
          <a-form-item name="status" :label="$t('apply_course.status')">
            <a-select
              v-model:value="service.form_create.status"
              size="large"
              :placeholder="$t('apply_course.select_status')"
              allow-clear
            >
              <a-select-option :value="ApplyCourseStatus.APPROVED">
                {{ $t('apply_course.status_approved') }}
              </a-select-option>
              <a-select-option :value="ApplyCourseStatus.PENDING">
                {{ $t('apply_course.status_pending') }}
              </a-select-option>
              <a-select-option :value="ApplyCourseStatus.REJECTED">
                {{ $t('apply_course.status_rejected') }}
              </a-select-option>
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
// import { useApplyCourseStore } from '../../stores/use-Apply-course.store';
import { useCourseStore } from '@/modules/admin/course/stores/use-Course.store';
import { useCustomerStore } from '@/modules/admin/student/stores/student.store';
import { ApplyCourseStatus } from '../../domain/models/apply_course.model';

const courseStore = useCourseStore();
const studentSotre = useCustomerStore()
const service = container.resolve(UserAdminFormService);
const formRef = ref<FormInstance | null>(null);


onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>