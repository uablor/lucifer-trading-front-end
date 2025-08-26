<template>
    <div class="logo">
        <img src="@/assets/images/logo/logo.png" />
    </div>

    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" class="sidebar-menu" mode="inline">

        <a-sub-menu key="/admin/user/admin">
            <template #title>
                <user-outlined />
                <span>{{ $t('sidebar.user_mgmt') }}</span>
            </template>
            <a-menu-item key="admin.user">
                <router-link :to="{ name: 'admin.user' }">{{ $t('sidebar.users') }}</router-link>
            </a-menu-item>
            <a-menu-item key="admin.role">
                <router-link :to="{ name: 'admin.role' }">{{ $t('sidebar.roles') }}</router-link>
            </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="admin.student">
            <idcard-outlined />
            <span>{{ $t('sidebar.students') }}</span>
            <router-link :to="{ name: 'admin.student' }" />
        </a-menu-item>

        <a-menu-item key="admin.teacher">
            <team-outlined />
            <span>{{ $t('sidebar.teachers') }}</span>
            <router-link :to="{ name: 'admin.teacher' }" />
        </a-menu-item>

        <a-sub-menu key="/admin/course_categorie">
            <template #title>
                <video-camera-outlined />
                <span>{{ $t('sidebar.courses') }}</span>
            </template>
            <a-menu-item key="admin.course">
                <router-link :to="{ name: 'admin.course' }">{{ $t('sidebar.manage_courses') }}</router-link>
            </a-menu-item>
            <a-menu-item key="admin.course_categorie">
                <router-link :to="{ name: 'admin.course_categorie' }">{{ $t('sidebar.course_categories') }}</router-link>
            </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="apply">
            <template #title>
                <upload-outlined />
                <span>{{ $t('sidebar.applications') }}</span>
            </template>
            <a-menu-item key="admin.apply_course">
                <router-link :to="{ name: 'admin.apply_course' }">{{ $t('sidebar.apply_courses') }}</router-link>
            </a-menu-item>
            <a-menu-item key="admin.course_completion_record">
                <router-link :to="{ name: 'admin.course_completion_record' }">{{ $t('sidebar.completion_records')
                    }}</router-link>
            </a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
    UserOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    IdcardOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const routeToSubmenuMap: Record<string, string> = {
    'admin.user': '/admin/user/admin',
    'admin.role': '/admin/user/admin',
    'admin.permission': '/admin/user/admin',
    'admin.course': '/admin/course_categorie',
    'admin.course_categorie': '/admin/course_categorie',
    'admin.apply_course': 'apply',
    'admin.course_completion_record': 'apply'
};

watch(
    () => route.name,
    (routeName) => {
        if (routeName) {
            selectedKeys.value = [routeName as string];

            const submenuKey = routeToSubmenuMap[routeName as string];
            if (submenuKey) {
                openKeys.value = [submenuKey];
            } else {
                openKeys.value = [];
            }

        }
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8125rem 0.5rem;
    height: 100px;
    background: rgba(255, 255, 255, 0.2);

    img {
        width: 4rem;
        height: 4rem;
        object-fit: contain;
        border-radius: 5px;
    }
}

.sidebar-menu {
    border-right: none;
}
</style>