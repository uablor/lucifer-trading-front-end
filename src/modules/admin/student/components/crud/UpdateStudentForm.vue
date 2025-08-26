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
          <a-form-item name="email" :label="$t('student.email')">
            <a-input v-model:value="composable.form_edit.email" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="birth_date" :label="$t('student.birth_date')">
            <a-date-picker format="DD-MM-YYYY" type="date" v-model:value="composable.form_edit.birth_date"
              style="width: 100%" :placeholder="$t('student.birth_date')" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :rules="[{ required: true, message: $t('student.error.required_district') }]"
            :label="$t('common.province')">
            <a-select v-model:value="composable.address_id.province_id" :placeholder="$t('common.select_province')"
              :options="store.address.province" :field-names="{ label: 'name', value: 'id' }" show-search
              option-filter-prop="label" @change="composable.fetchDistricts" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label="$t('common.district')"
            :rules="[{ required: true, message: $t('validation.required_district') }]">
            <a-select v-model:value="composable.address_id.district_id" :placeholder="$t('common.select_district')"
              :options="store.address.district" :field-names="{ label: 'name', value: 'id' }" show-search
              option-filter-prop="label" />
          </a-form-item>

        </a-col>

      </a-row>

      <a-form-item name="gender" :label="$t('student.gender.title')">
        <a-select v-model:value="composable.form_edit.gender" placeholder="Select gender">
          <a-select-option :value="Gender.MALE">{{ $t('student.gender.male') }}</a-select-option>
          <a-select-option :value="Gender.FEMALE">{{ $t('student.gender.female') }}</a-select-option>
        </a-select>
      </a-form-item>


    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { Gender } from '@/shared/enums/gender.enum';
import StudentFormService from '../../composables/student.composable';
import { useCustomerStore } from '../../stores/student.store';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const store = useCustomerStore();
const { composable } = defineProps<{
  composable: StudentFormService
}>();
const formRef = ref<FormInstance | null>(null);

onMounted(() => {
  composable.formRef = formRef;
});

</script>
