<template>
    <a-layout style="min-height: 100vh; transition: all 0.3s ease  ;" >
        <a-layout-sider 
            v-model:collapsed="collapsed" 
            :trigger="null" 
            collapsible 
            style="
                background: #fff; 
                position: fixed; 
                left: 0; 
                top: 0; 
                height: 100vh; 
                z-index: 100;
                overflow-y: auto;
                transition: all 0.3s ease;
            "
        >
            <SidebarComponent />
        </a-layout-sider>
        <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
            <NavbarComponent 
                @toggle-sidebar="() => (collapsed = !collapsed)" 
                :style="{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: collapsed ? '80px' : '200px',
                    zIndex: 99,
                    background: '#fff',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'left 0.2s'
                }"
            />
            <a-layout-content :style="{
                margin: '10px 10px',
                marginTop: '74px',
                padding: '24px',
                background: '#fff',
                minHeight: 'calc(100vh - 84px)',
                overflow: 'auto'
            }">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import SidebarComponent from './SidebarLayout.vue';
import NavbarComponent from './NavbarLayout.vue';

const collapsed = ref<boolean>(false);
</script>

<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.ant-layout-sider {
    transition: all 0.2s;
}


</style>