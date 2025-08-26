<template>
  <div class="verification-container">
    <div class="verification-card">
      <!-- Loading State - กำลังตรวจสอบ -->
      <div v-if="verificationStatus === 'loading'" class="verification-content">
        <div class="icon-container">
          <a-spin size="large" />
        </div>
        <h2 class="title">ກຳລັງຢືນຢັນອີເມວ...</h2>
        <p class="subtitle">ກະລຸນາລໍຖ້າສັກຄູ່</p>
      </div>

      <!-- Success State - ยืนยันสำเร็จ -->
      <div v-else-if="verificationStatus === 'success'" class="verification-content">
        <div class="icon-container success">
          <CheckCircleOutlined class="success-icon" />
        </div>
        <h2 class="title">ຢືນຢັນອີເມວສຳເລັດ!</h2>
        <p class="subtitle">ບັນຊີຂອງທ່ານໄດ້ຖືກເປີດໃຊ້ງານແລ້ວ</p>
        
        <div class="success-actions">
          <a-button 
            type="primary" 
            size="large" 
            class="action-button"
          >
            <template #icon>
              <ArrowRightOutlined />
            </template>
            ເຂົ້າສູ່ລະບົບ
          </a-button>
        </div>
      </div>

      <!-- Error State - ยืนยันไม่สำเร็จ -->
      <div v-else-if="verificationStatus === 'error'" class="verification-content">
        <div class="icon-container error">
          <CloseCircleOutlined class="error-icon" />
        </div>
        <h2 class="title">ຢືນຢັນອີເມວບໍ່ສຳເລັດ</h2>
        <p class="subtitle">{{ errorMessage }}</p>
        
        <div class="error-actions">
          <a-button 
            type="primary" 
            ghost 
            size="large" 
            @click="resendVerification"
            :loading="isResending"
            class="action-button"
          >
            <template #icon>
              <RedoOutlined />
            </template>
            ສົ່ງອີເມວຢືນຢັນໃໝ່
          </a-button>
          
          <a-button 
            size="large" 
            @click="goToLogin"
            class="action-button secondary"
          >
            ກັບສູ່ໜ້າເຂົ້າສູ່ລະບົບ
          </a-button>
        </div>
      </div>

      <!-- Expired State - ลิงก์หมดอายุ -->
      <div v-else-if="verificationStatus === 'expired'" class="verification-content">
        <div class="icon-container warning">
          <ExclamationCircleOutlined class="warning-icon" />
        </div>
        <h2 class="title">ລິ້ງຢືນຢັນໝົດອາຍຸແລ້ວ</h2>
        <p class="subtitle">ລິ້ງຢືນຢັນນີ້ໄດ້ໝົດອາຍຸ ຫຼື ຖືກໃຊ້ໄປແລ້ວ</p>
        
        <div class="expired-actions">
          <a-button 
            type="primary" 
            size="large" 
            @click="resendVerification"
            :loading="isResending"
            class="action-button"
          >
            <template #icon>
              <MailOutlined />
            </template>
            ສົ່ງລິ້ງຢືນຢັນໃໝ່
          </a-button>
        </div>
      </div>

      <!-- Initial State - รอคลิกลิงก์ (สำหรับกรณีที่ยังไม่มี token) -->
      <div v-else class="verification-content">
        <div class="icon-container">
          <MailOutlined class="mail-icon" />
        </div>
        <h2 class="title">ກວດສອບອີເມວຂອງທ່ານ</h2>
        <p class="subtitle">
          ເຮົາໄດ້ສົ່ງລິ້ງຢືນຢັນໄປທີ່ : {{ email }} <strong></strong>
        </p>
        
        <div class="email-instructions">
          <a-alert 
            message="ຄຳແນະນຳ" 
            type="info" 
            show-icon
            class="instruction-alert"
          >
            <template #description>
              <ul class="instruction-list">
                <li>ເປີດອີເມວຂອງທ່ານ</li>
                <li>ຊອກຫາອີເມວຈາກ </li>
                <li>ກົດທີ່ລິ້ງ "ຢືນຢັນອີເມວ" ໃນອີເມວ</li>
                <li>ທ່ານຈະຖືກນຳມາໜ້ານີ້ອັດຕະໂນມັດ</li>
              </ul>
            </template>
          </a-alert>
        </div>

        <div class="initial-actions">
          <a-button 
            type="primary" 
            ghost 
            size="large" 
            @click="resendVerification(email)"
            :loading="isResending"
            class="action-button"
          >
            <template #icon>
              <RedoOutlined />
            </template>
            ສົ່ງອີເມວໃໝ່
          </a-button>
          
          <a-button 
            type="link" 
            @click="changeEmail"
            class="change-email-link"
          >
            ປ່ຽນທີ່ຢູ່ອີເມວ
          </a-button>
        </div>
      </div>
    </div>

    <!-- Change Email Modal -->
    <a-modal
      v-model:open="showChangeEmailModal"
      title="ປ່ຽນທີ່ຢູ່ອີເມວ"
      @ok="handleChangeEmail"
      :confirm-loading="isChangingEmail"
      ok-text="ສົ່ງລິ້ງຢືນຢັນ"
      cancel-text="ຍົກເລີກ"
    >
      <a-form layout="vertical">
        <a-form-item label="ທີ່ຢູ່ອີເມວໃໝ່">
          <a-input 
            v-model:value="newEmail" 
            type="email"
            placeholder="example@email.com"
            size="large"
          />
        </a-form-item>
        <a-form-item>
          <a-alert 
            message="ລິ້ງຢືນຢັນໃໝ່ຈະຖືກສົ່ງໄປທີ່ອີເມວໃໝ່" 
            type="info" 
            show-icon 
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEmailVerification } from '../../composables/useAuth/Email.Test.componsable';

const route = useRoute();

const email = ref<string>('')
const {
  verificationStatus,
  errorMessage,
  isResending,
  newEmail,
  goToLogin,
  isChangingEmail,
  showChangeEmailModal,
  resendVerification,
  handleChangeEmail,
  changeEmail,

} = useEmailVerification();

onMounted(() => {
  email.value = route.query.email as string;
});
</script>


<style lang="scss" scoped>
.verification-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.verification-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.verification-content {
  .icon-container {
    margin-bottom: 24px;
    
    &.success .success-icon {
      font-size: 64px;
      color: #52c41a;
    }
    
    &.error .error-icon {
      font-size: 64px;
      color: #ff4d4f;
    }
    
    &.warning .warning-icon {
      font-size: 64px;
      color: #faad14;
    }
    
    .mail-icon {
      font-size: 64px;
      color: #1890ff;
    }
  }
  
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #262626;
    margin: 0 0 12px 0;
  }
  
  .subtitle {
    font-size: 16px;
    color: #8c8c8c;
    margin: 0 0 32px 0;
    line-height: 1.5;
  }
}

.email-instructions {
  margin: 24px 0;
  text-align: left;
  
  .instruction-alert {
    border-radius: 8px;
  }
  
  .instruction-list {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.success-actions,
.error-actions,
.expired-actions,
.initial-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .action-button {
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    
    &.secondary {
      background: #f5f5f5;
      border-color: #d9d9d9;
      color: #595959;
      
      &:hover {
        background: #e6f7ff;
        border-color: #91d5ff;
        color: #1890ff;
      }
    }
  }
  
  .change-email-link {
    margin-top: 8px;
    font-size: 14px;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .verification-container {
    padding: 16px;
  }
  
  .verification-card {
    padding: 24px;
  }
  
  .verification-content {
    .title {
      font-size: 20px;
    }
    
    .subtitle {
      font-size: 14px;
    }
    
    .icon-container {
      .success-icon,
      .error-icon,
      .warning-icon,
      .mail-icon {
        font-size: 48px;
      }
    }
  }
}

// Animation
.verification-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>