<template>
  <a-card class="profile-card" bordered={false}>
    <h2 class="form-title">🧑 Personal Information</h2>
    <p class="form-subtitle">Your profile details</p>

    <!-- แสดงข้อมูล -->
    <a-descriptions bordered column="1" size="middle">
      <a-descriptions-item label="First Name">{{ useProfile.userProfile.username }}</a-descriptions-item>
      <a-descriptions-item label="Last Name">{{ useProfile.userProfile.email }}</a-descriptions-item>
      <a-descriptions-item label="Phone">{{ useProfile.userProfile.phoneNumber }}</a-descriptions-item>
      <a-descriptions-item label="Date of Birth">
        {{ useProfile.userProfile.dateOfBirth ? useProfile.userProfile.dateOfBirth : '-' }}
      </a-descriptions-item>
      <a-descriptions-item label="Address">{{ useProfile.userProfile.address || '-' }}</a-descriptions-item>
      <a-descriptions-item label="Trading Experience">{{ useProfile.userProfile.tradingExperience }}</a-descriptions-item>
    </a-descriptions>

    <!-- ปุ่ม -->
    <div class="form-actions">
      <a-button type="primary" @click="isModalVisible = true" shape="round">
        <SaveOutlined /> Update Profile
      </a-button>
    </div>
  </a-card>

  <!-- Modal สำหรับแก้ไข -->
  <a-modal
    v-model:open="isModalVisible"
    title="Update Profile"
    :confirm-loading="profileLoading"
    @ok="updateProfile"
    @cancel="resetuseProfile.ProfileForm"
  >
    <a-form :model="useProfile.profileForm" :rules="profileRules" layout="vertical">
      <a-form-item label="First Name" name="firstName">
        <a-input v-model:value="useProfile.profileForm.firstName" allow-clear />
      </a-form-item>
      <a-form-item label="Last Name" name="lastName">
        <a-input v-model:value="useProfile.profileForm.lastName" allow-clear />
      </a-form-item>
      <a-form-item label="Phone Number" name="phoneNumber">
        <a-input v-model:value="useProfile.profileForm.phoneNumber" allow-clear />
      </a-form-item>
      <a-form-item label="Date of Birth" name="dateOfBirth">
        <a-date-picker v-model:value="useProfile.profileForm.dateOfBirth" style="width: 100%" />
      </a-form-item>
      <a-form-item label="Address" name="address">
        <a-textarea v-model:value="useProfile.profileForm.address" :rows="3" allow-clear />
      </a-form-item>
      <a-form-item label="Trading Experience" name="tradingExperience">
        <a-select v-model:value="useProfile.profileForm.tradingExperience">
          <a-select-option value="beginner">Beginner (< 1 year)</a-select-option>
          <a-select-option value="intermediate">Intermediate (1-3 years)</a-select-option>
          <a-select-option value="advanced">Advanced (3-5 years)</a-select-option>
          <a-select-option value="expert">Expert (> 5 years)</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { container } from 'tsyringe'
import { SaveOutlined } from '@ant-design/icons-vue'
import ProfileComposable from '../../composables/profile.composables'

const useProfile = container.resolve(ProfileComposable)

// โหลดข้อมูลเมื่อ component mount
onMounted(() => {
  useProfile.getProfile()
})
</script>


<style scoped lang="scss">
.profile-card {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  background: #fff;

  .form-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1a1a1a;
  }

  .form-subtitle {
    font-size: 14px;
    color: #888;
    margin-bottom: 20px;
  }

  .form-actions {
    margin-top: 24px;
    text-align: right;
  }
}

@media (max-width: 576px) {
  .profile-card {
    padding: 16px;

    .form-title {
      font-size: 18px;
    }

    .form-subtitle {
      font-size: 13px;
    }

    .form-actions {
      flex-direction: column;
      button {
        width: 100%;
      }
    }
    }
}

</style>