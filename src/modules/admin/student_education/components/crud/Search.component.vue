<template>
        <a-input-search
            v-model:value="store.query.search"
            :placeholder="$t('common.search')"
            style="width: 200px"
            @search="handleSearch"
        />
</template>

<script setup lang="ts">
import { container } from 'tsyringe';
import { useStudentEducationStore } from '../../stores/use-student-education.store';
import StudentEducationFormService from '../../composables/studenteducation.composable';

const studentService = container.resolve(StudentEducationFormService);
const store = useStudentEducationStore();

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
