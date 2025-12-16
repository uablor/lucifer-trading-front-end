<template>
    <div>
        <a-card title="Two-Factor Authentication" class="twofa-card">
          <div class="twofa-status">
            <a-row align="middle" justify="space-between">
              <a-col>
                <div class="twofa-info">
                  <h3>
                    <SafetyOutlined />
                    Two-Factor Authentication
                    <a-tag :color="userProfile.twoFactorEnabled ? 'green' : 'red'">
                      {{ userProfile.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                    </a-tag>
                  </h3>
                  <p>
                    {{ userProfile.twoFactorEnabled 
                        ? 'Your account is protected with 2FA. You can disable it anytime.' 
                        : 'Secure your account by enabling two-factor authentication.' 
                    }}
                  </p>
                </div>
              </a-col>
              <a-col>
                <a-button 
                  :type="userProfile.twoFactorEnabled ? 'danger' : 'primary'"
                  :loading="twoFaLoading"
                  @click="toggleTwoFactorAuth"
                  size="large"
                >
                  {{ userProfile.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}
                </a-button>
              </a-col>
            </a-row>
          </div>

          <!-- 2FA Setup Modal -->
          <a-modal
            v-model:open="twoFaModalVisible"
            title="Setup Two-Factor Authentication"
            :footer="null"
            width="600px"
          >
            <div class="twofa-setup">
              <a-steps :current="twoFaStep" class="setup-steps">
                <a-step title="Install App" />
                <a-step title="Scan QR Code" />
                <a-step title="Verify Code" />
              </a-steps>

              <!-- Step 1: Install App -->
              <div v-if="twoFaStep === 0" class="setup-step">
                <h4>Install Authenticator App</h4>
                <p>Download and install one of these authenticator apps:</p>
                <a-space direction="vertical">
                  <a-button type="link">Google Authenticator</a-button>
                  <a-button type="link">Authy</a-button>
                  <a-button type="link">Microsoft Authenticator</a-button>
                </a-space>
                <div class="step-actions">
                  <a-button type="primary" @click="twoFaStep++">Next</a-button>
                </div>
              </div>

              <!-- Step 2: Scan QR Code -->
              <div v-if="twoFaStep === 1" class="setup-step">
                <h4>Scan QR Code</h4>
                <p>Scan this QR code with your authenticator app:</p>
                <div class="qr-code-container">
                  <div class="qr-code-placeholder">
                    [QR Code Here]
                  </div>
                </div>
                <p><strong>Manual Entry Key:</strong> {{ twoFaSecret }}</p>
                <div class="step-actions">
                  <a-button @click="twoFaStep--">Back</a-button>
                  <a-button type="primary" @click="twoFaStep++">Next</a-button>
                </div>
              </div>

              <!-- Step 3: Verify Code -->
              <div v-if="twoFaStep === 2" class="setup-step">
                <h4>Verify Authentication Code</h4>
                <p>Enter the 6-digit code from your authenticator app:</p>
                <a-form @finish="verifyTwoFaCode">
                  <a-form-item>
                    <a-input 
                      v-model:value="twoFaVerificationCode" 
                      placeholder="Enter 6-digit code"
                      maxlength="6"
                      style="font-size: 18px; text-align: center;"
                    />
                  </a-form-item>
                  <div class="step-actions">
                    <a-button @click="twoFaStep--">Back</a-button>
                    <a-button type="primary" html-type="submit" :loading="twoFaVerifying">
                      Enable 2FA
                    </a-button>
                  </div>
                </a-form>
              </div>
            </div>
          </a-modal>

          <!-- Backup Codes -->
          <div v-if="userProfile.twoFactorEnabled" class="backup-codes">
            <a-divider />
            <h4>Backup Recovery Codes</h4>
            <p>Save these backup codes in a secure place. You can use them to access your account if you lose your phone:</p>
            <a-row :gutter="16">
              <a-col :span="12" v-for="(code, index) in backupCodes" :key="index">
                <a-input :value="code" readonly class="backup-code" />
              </a-col>
            </a-row>
            <a-space class="backup-actions">
              <a-button @click="downloadBackupCodes">
                <DownloadOutlined />
                Download Codes
              </a-button>
              <a-button @click="regenerateBackupCodes">
                <ReloadOutlined />
                Regenerate Codes
              </a-button>
            </a-space>
          </div>
        </a-card>
    </div>
</template>


<script setup lang="ts">
import { ref, reactive} from 'vue'
import { message } from 'ant-design-vue'
import {
  SafetyOutlined,
  ReloadOutlined,
  DownloadOutlined
} from '@ant-design/icons-vue'

// Active tab
const twoFaLoading = ref(false)
const twoFaVerifying = ref(false)

// User profile data
const userProfile = reactive({
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  verificationStatus: 'verified',
  tradingLevel: 'Advanced',
  twoFactorEnabled: false
})

// Profile form

// Two-Factor Authentication
const twoFaModalVisible = ref(false)
const twoFaStep = ref(0)
const twoFaSecret = ref('JBSWY3DPEHPK3PXP')
const twoFaVerificationCode = ref('')
const backupCodes = ref([
  'ABC123', 'DEF456', 'GHI789', 'JKL012',
  'MNO345', 'PQR678', 'STU901', 'VWX234'
])




const toggleTwoFactorAuth = () => {
  if (userProfile.twoFactorEnabled) {
    // Disable 2FA
    userProfile.twoFactorEnabled = false
    message.success('Two-factor authentication disabled')
  } else {
    // Enable 2FA - show setup modal
    twoFaModalVisible.value = true
    twoFaStep.value = 0
  }
}

const verifyTwoFaCode = async () => {
  if (!twoFaVerificationCode.value || twoFaVerificationCode.value.length !== 6) {
    message.error('Please enter a valid 6-digit code')
    return
  }

  twoFaVerifying.value = true
  try {
    // API call to verify 2FA code
    await new Promise(resolve => setTimeout(resolve, 1000))
    userProfile.twoFactorEnabled = true
    twoFaModalVisible.value = false
    twoFaVerificationCode.value = ''
    message.success('Two-factor authentication enabled successfully!')
  } catch (error) {
    message.error('Invalid verification code')
  } finally {
    twoFaVerifying.value = false
  }
}

const downloadBackupCodes = () => {
  const content = backupCodes.value.join('\n')
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'backup-codes.txt'
  link.click()
  URL.revokeObjectURL(url)
}

const regenerateBackupCodes = () => {
  // Generate new backup codes
  const newCodes = Array.from({ length: 8 }, () => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  )
  backupCodes.value = newCodes
  message.success('Backup codes regenerated successfully!')
}


</script>

<style scoped lang="scss">

.twofa-card {
  margin-top: 24px;
}

.twofa-status {
  padding: 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 24px;
}

.twofa-info h3 {
  color: white;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.twofa-info p {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.twofa-setup {
  padding: 20px 0;
}

.setup-steps {
  margin-bottom: 32px;
}

.setup-step {
  text-align: center;
  padding: 20px;
}

.qr-code-container {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.qr-code-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #999;
  font-size: 16px;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.backup-codes {
  margin-top: 24px;
}

.backup-code {
  width: 100px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.backup-code:hover {
  background: #e0e0e0;
}

.backup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}
</style>