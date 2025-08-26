<template>
  <div class="verification-page">
    <div class="verification-container">
      
      <!-- Loading State -->
      <div v-if="status === 'verifying'" class="verification-card">
        <div class="loading-content">
          <a-spin size="large" class="loading-spinner" />
          <h2 class="title">ກຳລັງຢືນຢັນອີເມວ...</h2>
          <p class="description">ກະລຸນາລໍຖ້າສັກຄູ່</p>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'success'" class="verification-card success">
        <div class="result-content">
          <div class="icon-wrapper success">
            <CheckCircleOutlined class="result-icon" />
          </div>
          <h1 class="title">ຢືນຢັນສຳເລັດ!</h1>
          <p class="description">
            ອີເມວຂອງທ່ານໄດ້ຖືກຢືນຢັນແລ້ວ<br>
            ບັນຊີຂອງທ່ານພ້ອມໃຊ້ງານແລ້ວ
          </p>
          
          <div class="action-buttons">
            <a-button 
              type="primary" 
              size="large" 
              @click="goToLogin"
              class="primary-btn"
            >
              <LoginOutlined />
              ເຂົ້າສູ່ລະບົບ
            </a-button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="status === 'error'" class="verification-card error">
        <div class="result-content">
          <div class="icon-wrapper error">
            <CloseCircleOutlined class="result-icon" />
          </div>
          <h1 class="title">ຢືນຢັນບໍ່ສຳເລັດ</h1>
          <p class="description">{{ errorMessage }}</p>
          
          <div class="action-buttons">
            <a-button 
              type="primary" 
              size="large" 
              ghost
              @click="requestNewLink"
              :loading="isRequesting"
              class="primary-btn"
            >
              <MailOutlined />
              ຂໍລິ້ງໃໝ່
            </a-button>
            
            <a-button 
              size="large" 
              @click="goToLogin"
              class="secondary-btn"
            >
              ກັບໄປໜ້າເຂົ້າສູ່ລະບົບ
            </a-button>
          </div>
        </div>
      </div>

      <!-- Expired State -->
      <div v-else-if="status === 'expired'" class="verification-card expired">
        <div class="result-content">
          <div class="icon-wrapper expired">
            <ExclamationCircleOutlined class="result-icon" />
          </div>
          <h1 class="title">ລິ້ງໝົດອາຍຸ</h1>
          <p class="description">
            ລິ້ງຢືນຢັນນີ້ໝົດອາຍຸແລ້ວ ຫຼື ຖືກໃຊ້ໄປແລ້ວ<br>
            ກະລຸນາຂໍລິ້ງໃໝ່
          </p>
          
          <div class="action-buttons">
            <a-button 
              type="primary" 
              size="large" 

              @click="requestNewLink"
              :loading="isRequesting"
              class="primary-btn"
            >
              <ReloadOutlined />
              ຂໍລິ້ງໃໝ່
            </a-button>
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="page-footer">
      <p class="footer-text">
        ມີບັນຫາ? <a href="mailto:support@yourapp.com">ຕິດຕໍ່ສະໜັບສະໜູນ</a>
      </p>
    </div>

    <!-- Request New Link Modal -->
    <a-modal
      v-model:open="showEmailModal"
      title="ຂໍລິ້ງຢືນຢັນໃໝ່"
      @ok="sendNewVerificationLink"
      :confirm-loading="isSending"
      ok-text="ສົ່ງ"
      cancel-text="ຍົກເລີກ"
    >
      <a-form layout="vertical">
        <a-form-item label="ທີ່ຢູ່ອີເມວ">
          <a-input 
            v-model:value="emailForResend" 

            type="email"
            placeholder="your@email.com"
            size="large"
          />
        </a-form-item>
        <a-alert 
          message="ລິ້ງຢືນຢັນໃໝ່ຈະຖືກສົ່ງໄປທີ່ອີເມວນີ້" 
          type="info" 
          show-icon 
        />
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LoginOutlined,
  MailOutlined,
  ReloadOutlined
} from '@ant-design/icons-vue';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEmailVerification } from '../../composables/useAuth/useEmailVerification';

const {
  status,
  errorMessage,
  isRequesting,
  isSending,
  showEmailModal,
  emailForResend,
  verifyEmail,
  requestNewLink,
  sendNewVerificationLink,
  goToLogin
} = useEmailVerification();

const route = useRoute();

onMounted(() => {
  const token = route.query.token as string;
  if (token) {
    verifyEmail(token);
  } else {
    status.value = 'error';
    errorMessage.value = 'ບໍ່ພົບລະຫັດຢືນຢັນ';
  }
});
</script>

<style lang="scss" scoped>
.verification-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.verification-container {
  width: 100%;
  max-width: 480px;
}

.verification-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  padding: 48px 40px;
  text-align: center;
  animation: slideInUp 0.6s ease-out;

  &.success {
    border-top: 4px solid #52c41a;
  }

  &.error {
    border-top: 4px solid #ff4d4f;
  }

  &.expired {
    border-top: 4px solid #faad14;
  }
}

.loading-content {
  .loading-spinner {
    margin-bottom: 24px;
  }
}

.result-content {
  .icon-wrapper {
    margin-bottom: 24px;

    .result-icon {
      font-size: 72px;
    }

    &.success .result-icon {
      color: #52c41a;
    }

    &.error .result-icon {
      color: #ff4d4f;
    }

    &.expired .result-icon {
      color: #faad14;
    }
  }
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.description {
  font-size: 16px;
  color: #8c8c8c;
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .primary-btn {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .secondary-btn {
    height: 44px;
    font-size: 14px;
    border-radius: 6px;
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

.page-footer {
  margin-top: 32px;
  text-align: center;

  .footer-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    margin: 0;

    a {
      color: white;
      text-decoration: underline;

      &:hover {
        color: #91d5ff;
      }
    }
  }
}

// Animations
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .verification-page {
    padding: 16px;
  }

  .verification-card {
    padding: 32px 24px;
  }

  .title {
    font-size: 24px;
  }

  .description {
    font-size: 15px;
  }

  .result-content .icon-wrapper .result-icon {
    font-size: 56px;
  }

  .action-buttons {
    .primary-btn {
      height: 44px;
      font-size: 15px;
    }
  }
}

@media (max-width: 480px) {
  .verification-card {
    padding: 24px 20px;
  }

  .title {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }
}
</style>