<template>
    <div class="profile-container">
        <div>
            <profile-header-component />
        </div>

        <a-tabs v-model:activeKey="activeTab" type="card" class="profile-tabs">

            <a-tab-pane key="profile" tab="Profile Information">
                <profile-information-component />
            </a-tab-pane>

            <a-tab-pane key="security" tab="Security Settings">
                <a-card title="Security Settings" class="security-card">
                <change-password-component />
                <change-email-component />
                </a-card>
            

                <twofa-component />
            </a-tab-pane>

            <a-tab-pane key="trading" tab="Trading Preferences">
                <trading-settings-component />
            </a-tab-pane>

            <a-tab-pane key="activity" tab="Account Activity">
                <activity-component />
            </a-tab-pane>

        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import twofaComponent from '../components/twofa/Twofa.component.vue'
import ChangePasswordComponent from '../components/change_password/Change.password.component.vue'
import ChangeEmailComponent from '../components/change_email/Change.email.component.vue'
import profileHeaderComponent from '../components/main/profile-header.component.vue'
import profileInformationComponent from '../components/main/profile-information.component.vue'
import activityComponent from '../components/main/activity.component.vue'
import tradingSettingsComponent from '../components/trading_settings/Trading.Settings.component.vue'
const activeTab = ref('profile')

</script>

<style scoped lang="scss">
.profile-container {
    margin: 0 auto;
    padding: 24px 0px;
    background: #f5f5f5;
}
</style>