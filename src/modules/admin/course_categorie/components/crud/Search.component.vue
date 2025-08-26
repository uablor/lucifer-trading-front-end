<template>
    <a-input-search v-model:value="store.query.search" :placeholder="$t('common.search')" style="width: 200px"
        @search="handleSearch" />
</template>

<script setup lang="ts">
import StudentFormService from '../../composables/course-categories.composable';
import { container } from 'tsyringe';
import { useCourseCategoriesStore } from '../../stores/use-course-categories.store';

const studentService = container.resolve(StudentFormService);
const store = useCourseCategoriesStore()

const handleSearch = () => {
    store.query = { ...store.query, search: store.query.search };
    studentService.fetchPage(store.query);
};
</script>

<style scoped>
.search-student {
    margin-bottom: 20px;
}
</style>
