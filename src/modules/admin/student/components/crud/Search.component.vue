<template>
        <a-input-search
            v-model:value="store.query.search"
            :placeholder="$t('common.search')"
            style="width: 200px"
            @search="handleSearch"
        />
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/modules/admin/student/stores/student.store';
import StudentFormService from '../../composables/student.composable';
import { container } from 'tsyringe';

const studentService = container.resolve(StudentFormService);
const store = useCustomerStore();

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
