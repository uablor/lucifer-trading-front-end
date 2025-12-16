<template>
    <a-layout class="layout-container">
        <a-layout-sider class="sidebar" width="65">
            <SidebarComponent />
        </a-layout-sider>
        <a-layout>
            <NavbarComponent class="navbar" />
            <a-layout-content class="content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import SidebarComponent from './SidebarLayout.vue';
import NavbarComponent from './NavbarLayout.vue';

</script>

<style lang="scss" scoped>
.layout-container {
    min-height: 100vh;
    transition: all 0.3s ease;

    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 50px !important;
        z-index: 100;
        overflow-y: auto;
        transition: all 0.3s ease;
        background-color: rgb(255, 255, 255) !important;
        border-right: 1px solid #8503ff !important;
    }

    .navbar {
        position: fixed;

        top: 0;
        right: 0;
        left: 50px;
        z-index: 99;
        transition: left 0.2s;
        border-bottom: 1px solid #8503ff !important;
    }

    .content {
        margin-top: 30px;
        margin-left: 50px;
        padding: 24px;
        overflow: auto;
    }
}
</style>