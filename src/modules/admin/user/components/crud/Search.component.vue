<template>
    <a-input-search v-model:value="store.query.search" :placeholder="$t('common..search')" style="width: 200px"
        @search="handleSearch" />
</template>

<script setup lang="ts">
import UserAdminFormService from '../../composables/user-admin.composable';
import { container } from 'tsyringe';
import { useUserAdminStore } from '../../stores/use-useradmin.store';

const UserAdminService = container.resolve(UserAdminFormService);
const store = useUserAdminStore();

const handleSearch = () => {
    store.query = { ...store.query, search: store.query.search };
    UserAdminService.fetchPage(store.query);
};
</script>

<style scoped>
.search-UserAdmin {
    margin-bottom: 20px;
}
</style>
