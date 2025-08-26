<template>
  <a-button type="primary" @click="service.open_create.value = true" >
    {{ $t('student.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('student.modal_title')" @ok="service.create"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('student.submit')" :cancel-text="$t('student.cancel')"
    @cancel="() => (service.open_create.value = false, service.resetAddress(), service.resetForm())">
    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('student.name')">
            <a-input v-model:value="service.form_create.name" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('student.surname')">
            <a-input v-model:value="service.form_create.surname" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="email" :label="$t('student.email')">
            <a-input v-model:value="service.form_create.email" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="password" :label="$t('student.password')">
            <a-input-password v-model:value="service.form_create.password" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="gender" :label="$t('student.gender.title')">
            <a-select v-model:value="service.form_create.gender" placeholder="Select gender">
              <a-select-option :value="Gender.MALE">{{ $t('student.gender.male') }}</a-select-option>
              <a-select-option :value="Gender.FEMALE">{{ $t('student.gender.female') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="birth_date" :label="$t('student.birth_date')">
            <a-date-picker format="DD-MM-YYYY" type="date" v-model:value="service.form_create.birth_date"
              style="width: 100%" :placeholder="$t('student.birth_date')" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :rules="[{ required: true, message: $t('student.error.required_district') }]"
            :label="$t('common.province')">
            <a-select v-model:value="service.address_id.province_id" :placeholder="$t('common.select_province')"
              :options="store.address.province" :field-names="{ label: 'name', value: 'id' }" show-search
              option-filter-prop="label" @change="service.fetchDistricts" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label="$t('common.district')"
            :rules="[{ required: true, message: $t('validation.required_district') }]">
            <a-select v-model:value="service.address_id.district_id" :placeholder="$t('common.select_district')"
              :options="store.address.district" :field-names="{ label: 'name', value: 'id' }" show-search
              option-filter-prop="label" />
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
import StudentFormService from '../../composables/student.composable';
import { useCustomerStore } from '../../stores/student.store';
import { Gender } from '@/shared/enums/gender.enum';

const store = useCustomerStore();
const service = container.resolve(StudentFormService);

const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  service.formRef = formRef;
});

</script>
