<template>

  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('teacher.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('teacher.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')" :cancel-text="$t('common.cancel')"
    width="550px" centered>

    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="student-form">

      <div>
        <h3>
          <UserOutlined />
          {{ $t('teacher.personal_info') || 'Personal Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="name" :label="$t('teacher.name')">
              <a-input v-model:value="service.form_create.name" size="large" placeholder="Enter first name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="surname" :label="$t('teacher.surname')">
              <a-input v-model:value="service.form_create.surname" size="large" placeholder="Enter last name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!-- <a-divider /> -->
      <div>
        <h3 class="section-title">
          <LockOutlined />
          {{ $t('teacher.account_info') || 'Account Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="email" :label="$t('teacher.email')">
              <a-input v-model:value="service.form_create.email" type="email" size="large"
                placeholder="Enter email address">
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="password" :label="$t('teacher.password')">
              <a-input-password v-model:value="service.form_create.password" size="large" placeholder="Enter password">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!-- <a-divider /> -->
      <div>
        <h3 class="section-title">
          <BookOutlined class="section-icon" />
          {{ $t('teacher.academic_info') || 'Academic Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="education" :label="$t('teacher.education')">
              <a-input v-model:value="service.form_create.education" size="large" placeholder="Enter education level">
                <template #prefix>
                  <BookOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="experience" :label="$t('teacher.experience')">
              <a-input-group compact>
                <!-- <a-space-compact block> -->
                <a-input-number v-model:value="service.form_create.experience" size="large"
                  placeholder="Enter experience " addonAfter="Year" @focus="service.onExperienceFocus"
                  @blur="service.onExperienceBlur">
                  <template #prefix>
                    <TrophyOutlined />
                  </template>
                </a-input-number>
                <!-- <a-button type="primary">Year</a-button>
                </a-space-compact> -->
              </a-input-group>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item name="specialization" :label="$t('teacher.specialization')">
          <a-input v-model:value="service.form_create.specialization" size="large" placeholder="Enter specialization">
            <template #prefix>
              <StarOutlined />
            </template>
          </a-input>
        </a-form-item>
      </div>
    </a-form>

  </a-modal>

</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import TeacherFormService from '../../composables/teacher.composable';
// import { Gender } from '@/shared/enums/gender.enum';
// import { useTeacherStore } from '../../stores/use-teacher.store';
import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  BookOutlined,
  TrophyOutlined,
  StarOutlined,
} from '@ant-design/icons-vue';

// const store = useTeacherStore();
const service = container.resolve(TeacherFormService);
const formRef = ref<FormInstance | null>(null);


onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>