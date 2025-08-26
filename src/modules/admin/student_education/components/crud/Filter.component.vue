<template>
  <a-select v-model:value="store.query.is_active" style="width: 120px" @change="handleFilterChange">
    <a-select-option :value="Status.ACTIVE">{{ $t('common.active') }}</a-select-option>
    <a-select-option :value="Status.INACTIVE">{{ $t('common.inactive') }}</a-select-option>
  </a-select>

  <a-select v-model:value="store.query.sort" style="width: 120px" @change="handleFilterChange">
    <a-select-option :value="sortType.ASC">{{ $t('common.asc') }}</a-select-option>
    <a-select-option :value="sortType.DESC">{{ $t('common.desc') }}</a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
import { container } from 'tsyringe';
import { sortType, Status } from '@/shared/enums/pagination.query.enum';
import StudentEducationFormService from '../../composables/studenteducation.composable';
import { useStudentEducationStore } from '../../stores/use-student-education.store';

const store = useStudentEducationStore()
const studentService = container.resolve(StudentEducationFormService);

const handleFilterChange = () => {
  console.log("asdf", store.query);
  studentService.fetchPage(store.query);
};
</script>
