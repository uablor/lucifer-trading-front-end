<template>
    <a-input-search v-model:value="store.query.search" :placeholder="$t('common.search')" style="width: 200px"
        @search="handleSearch" />
</template>

<script setup lang="ts">
import StudentFormService from '../../composables/role.composable';
import { container } from 'tsyringe';
import { useRoleStore } from '../../stores/use-role.store';

const studentService = container.resolve(StudentFormService);
const store = useRoleStore();

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
