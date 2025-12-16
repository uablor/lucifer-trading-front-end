<template>
       <div class="profile-header">
      <a-row :gutter="24" align="middle">
        <a-col :span="4">
          <a-avatar :size="80" :src="userProfile.avatar" class="profile-avatar">
            <template v-if="!userProfile.avatar">
              <UserOutlined />
            </template>
          </a-avatar>
        </a-col>
        <a-col :span="20">
          <div class="profile-info">
            <h2>{{ userProfile.fullName }}</h2>
            <p class="profile-email">{{ userProfile.email }}</p>
            <a-space>
              <a-tag :color="userProfile.verificationStatus === 'verified' ? 'green' : 'orange'">
                {{ userProfile.verificationStatus === 'verified' ? 'Verified Account' : 'Pending Verification' }}
              </a-tag>
              <a-tag color="blue">Trading Level: {{ userProfile.tradingLevel }}</a-tag>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

import {
  UserOutlined,
} from '@ant-design/icons-vue'


// User profile data
const userProfile = reactive({
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  verificationStatus: 'verified',
  tradingLevel: 'Advanced',
  twoFactorEnabled: false
})



</script>

<style scoped lang="scss">
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
}

.profile-header {
  background: linear-gradient(135deg, #721be4 0%, #000000 100%);
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 24px;
  color: white;
}

.profile-avatar {
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.profile-info h2 {
  color: white;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.profile-email {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-bottom: 16px;
}

.profile-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.profile-card,
.notification-card,
.activity-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>