<!-- SidebarLayout.vue -->
<template>
    <div class="modern-sidebar">
        <!-- Logo Section -->
        <div class="logo-section">
            <div class="logo-container">
                <img src="@/assets/images/logo/logo.png" alt="Logo" />
            </div>
        </div>

        <!-- Navigation Menu -->
        <div class="nav-section">
            <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" class="sidebar-menu" mode="inline">
                <a-menu-item key="customer.profile" class="menu-item">
                    <div >
                        <user-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>
                
                <a-menu-item key="customer.wallet" class="menu-item">
                    <div >
                        <wallet-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>

                <a-menu-item key="dashboard" class="menu-item">
                    <div >
                        <dashboard-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>

                <a-menu-item key="trading" class="menu-item">
                    <div >
                        <stock-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>

                <a-menu-item key="portfolio" class="menu-item">
                    <div >
                        <pie-chart-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>

                <a-menu-item key="settings" class="menu-item">
                    <div>
                        <setting-outlined class="menu-icon" />
                    </div>
                    <router-link :to="{ name: 'customer.profile' }" class="menu-link">
                    </router-link>
                </a-menu-item>
            </a-menu>
        </div>

        <!-- User Section -->
        <div class="user-logout">
          
                <LogoutView />
           
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
    UserOutlined,
    WalletOutlined,
    DashboardOutlined,
    StockOutlined,
    PieChartOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';
import LogoutView from '@/modules/auth/views/LogoutView.vue';
const route = useRoute();
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const routeToSubmenuMap: Record<string, string> = {
    'customer.profile': '/profile',
    'customer.wallet': '/wallet',
    'dashboard': '/dashboard',
    'trading': '/trading',
    'portfolio': '/portfolio',
    'analytics': '/analytics',
    'settings': '/settings'
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
.modern-sidebar {
    height: 100vh;
    width: 60px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    // Subtle accent line
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
        opacity: 0.6;
    }

    .logo-section {
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100;
        border-bottom: 1px solid rgba(133, 3, 255, 0.2);

        .logo-container {
            position: relative;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            img {
                width: 65x;
                height: 65px;
                object-fit: contain;
                object-position:center;
                border-radius: 6px;
                filter: brightness(1.2) contrast(1.1);
                transition: all 0.3s ease;
            }
        }
    }

    .nav-section {
        flex: 1;
        padding: 12px 0;
        overflow-y: auto;

        // Custom scrollbar
        &::-webkit-scrollbar {
            width: 3px;
        }
        
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        
        &::-webkit-scrollbar-thumb {
            background: rgba(133, 3, 255, 0.3);
            border-radius: 2px;
        }
    }

    .sidebar-menu {
        background: transparent;
        border: none;

        :deep(.ant-menu-item) {
            width: 44px !important;
            height: 44px !important;
            margin: 8px 8px !important;
            padding: 0 !important;
            border-radius: 12px;
            background: transparent;
            border: 1px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            // Active indicator
            &::before {
                content: '';
                position: absolute;
                left: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 3px;
                height: 0;
                background: #8503ff;
                border-radius: 0 2px 2px 0;
                transition: height 0.3s ease;
            }

            &:hover {
                background: rgba(133, 3, 255, 0.15);
                border-color: rgba(133, 3, 255, 0.3);
                transform: translateX(2px);
                box-shadow: 0 4px 12px rgba(133, 3, 255, 0.2);

                .menu-icon {
                    color: #000000;
                    transform: scale(1.1);
                }
            }

            &.ant-menu-item-selected {
                background: rgba(133, 3, 255, 0.2);
                border-color: rgba(133, 3, 255, 0.5);
                transform: translateX(3px);
                box-shadow: 0 4px 15px rgba(133, 3, 255, 0.3);

                &::before {
                    height: 20px;
                }

                .menu-icon {
                    color: #000000;
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                }
            }

            .ant-menu-title-content {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            .menu-link {
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .menu-icon {
                font-size: 20px;
                color: #9ca3af;
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
            }
        }
    }

    .user-logout {
        padding: 16px 0;
        border-top: 1px solid rgba(133, 3, 255, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// Animation for menu items
.menu-item {
    animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

// Staggered animation delay
.menu-item:nth-child(1) { animation-delay: 0.1s; }
.menu-item:nth-child(2) { animation-delay: 0.15s; }
.menu-item:nth-child(3) { animation-delay: 0.2s; }
.menu-item:nth-child(4) { animation-delay: 0.25s; }
.menu-item:nth-child(5) { animation-delay: 0.3s; }
.menu-item:nth-child(6) { animation-delay: 0.35s; }

// Hover effect for entire sidebar
.modern-sidebar:hover {
    &::after {
        opacity: 0.8;
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .modern-sidebar {
        width: 56px;
        
        .logo-section .logo-container {
            width: 40px;
            height: 40px;
            
            img {
                width: 24px;
                height: 24px;
            }
        }
        
        :deep(.ant-menu-item) {
            width: 40px !important;
            height: 40px !important;
            margin: 6px 8px !important;
            
            .menu-icon {
                font-size: 18px;
            }
        }
        
        .user-section .user-avatar {
            width: 36px;
            height: 36px;
            
            .anticon {
                font-size: 16px;
            }
        }
    }
}
</style>