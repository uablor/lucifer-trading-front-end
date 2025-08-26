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
    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="course-form">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :sm="12">
          <a-form-item name="title" :label="$t('course.title')">
            <a-input v-model:value="service.form_create.title" size="large" placeholder="Enter course title" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="teacher" :label="$t('course.teacher')">
            <a-select v-model:value="service.form_create.teacher" :options="teacherSotre.state.data"
              :field-names="{ label: 'name', value: 'id' }" placeholder="Select teacher" size="large" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="category" :label="$t('course.category')">
            <a-select v-model:value="service.form_create.category" :options="categoriesStore.state.data"
              :field-names="{ label: 'name', value: 'id' }" placeholder="Select category" size="large" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="price" :label="$t('course.price')">
            <a-input-number v-model:value="service.form_create.price" size="large" style="width: 100%" :min="0"
              :formatter="formatPrice"
               addon-after="₭" placeholder="Enter price" />
          </a-form-item>
        </a-col>


        <a-col :xs="24" :sm="12">
          <a-form-item name="max_student" :label="$t('course.max_student')">
            <a-input-number v-model:value="service.form_create.max_student" size="large" style="width: 100%" :min="1"
              placeholder="Max student" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="duration_hours" :label="$t('course.duration')">
            <a-input-number v-model:value="service.form_create.duration_hours" size="large" style="width: 100%" :min="1"
              addon-after="hr" placeholder="Enter duration" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="start_date" :label="$t('course.start_date')">
            <a-date-picker v-model:value="service.form_create.start_date" size="large" style="width: 100%"
              format="DD-MM-YYYY" placeholder="Select start date" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="end_date" :label="$t('course.end_date')">
            <a-date-picker v-model:value="service.form_create.end_date" size="large" style="width: 100%"
              format="DD-MM-YYYY" placeholder="Select end date" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="registration_start_date" :label="$t('course.registration_start')">
            <a-date-picker v-model:value="service.form_create.registration_start_date" size="large" style="width: 100%"
              format="DD-MM-YYYY" placeholder="Select reg. start date" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item name="registration_end_date" :label="$t('course.registration_end')">
            <a-date-picker v-model:value="service.form_create.registration_end_date" size="large" style="width: 100%"
              format="DD-MM-YYYY" placeholder="Select reg. end date" />
          </a-form-item>
        </a-col>


        <a-col :span="24">
          <a-form-item name="description" :label="$t('course.description')">
            <a-textarea v-model:value="service.form_create.description" placeholder="Enter course description"
              rows="4" />
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
import { useCourseCategoriesStore } from '@/modules/admin/course_categorie/stores/use-course-categories.store';
import { useTeacherStore } from '@/modules/admin/teacher/stores/use-teacher.store';
import { formatPrice } from '@/shared/utils/formatCurrency';
// import { formatCurrency } from 
const categoriesStore = useCourseCategoriesStore();
const teacherSotre = useTeacherStore()
const service = container.resolve(UserAdminFormService);
const formRef = ref<FormInstance | null>(null);


// const  parseCurrency =(value:any) => {
//     return value.replace(/\$\s?|\,/g, ''); // ลบเครื่องหมายที่ไม่ใช่ตัวเลข
//   }

// const validateNumber = (value:any) => {
//     const filteredValue = value.replace(/[^0-9]/g, '');
//   }

onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>