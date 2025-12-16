<template>
  <a-button 
    size="large"
    @click="logout.showLogoutModal" 
    class="logout-trigger"
  >
    <div class="logout-icon">
      <LogoutOutlined />
    </div>

  </a-button>

  <a-modal
    v-model:open="logout.isLogoutModalVisible.value"
    title="ຢືນຢັນການອອກຈາກລະບົບ"
    :confirm-loading="logout.loding_logout.value"
    ok-text="ອອກຈາກລະບົບ"
    cancel-text="ຍົກເລີກ"
    ok-type="danger"
    @ok="logout.onFinish"
    @cancel="logout.onFinishFailed"
    centered
    :width="400"
  >
    <div class="logout-content">
      <div class="logout-icon">
        <ExclamationCircleOutlined class="warning-icon" />
      </div>
      <div class="logout-message">
        <p class="main-message">ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກລະບົບ?</p>
        <p class="sub-message">ທ່ານຈະຕ້ອງເຂົ້າສູ່ລະບົບໃໝ່ເພື່ອເຂົ້າໃຊ້ງານຕໍ່</p>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useLogout } from '../composables/useAuth/useLogout';

const logout = useLogout();


</script>

<style lang="scss" scoped>
.logout-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;  // ใช้ transparent แทน none
  border: none;                   // เอาขอบออกด้วยถ้ามี
  gap: 8px;
  padding: 12px 24px;
  font-size: 18px;
  min-width: 140px;
  height: 50px;
  border-radius: 8px;
  transition: all 0.3s ease;
  transform: scale(1);

  .logout-icon {
    font-size: 24px;
    color: #fd090d;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: transparent; // ปุ่มยังโปร่งใสตอน hover
    transform: scale(1.05);

    .logout-icon {
      transform: scale(1.2);
    }
  }
}



.logout-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
}

.logout-icon {
  .warning-icon {
    font-size: 24px;
    color: #faad14;
  }
}

.logout-message {
  flex: 1;
  
  .main-message {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    margin: 0 0 8px 0;
  }
  
  .sub-message {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  .logout-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }
}
</style>