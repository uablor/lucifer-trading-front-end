<template>

    <a-card class="change-pasasword-card">
        <div class="change-pasasword-status">
            <a-row align="middle" justify="space-between">
                <a-col>
                    <div class="change-pasasword-info">
                        <h3>
                            <SafetyOutlined />
                            Change Password
                            <a-tag color="green">
                                Enabled
                            </a-tag>
                        </h3>
                        <p>
                            'Your account is protected with 2FA. You can disable it anytime.'

                        </p>
                    </div>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="changePassword_modal = true" size="large">
                        change Password
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <!-- 2FA Setup Modal -->
        <a-modal v-model:open="changePassword_modal" title="Setup Two-Factor Authentication" :footer="null"
            width="400px">
            <a-form :model="passwordForm" :rules="passwordRules" layout="vertical" @finish="changePassword" width="50px">
                <a-form-item label="Current Password" name="currentPassword">
                    <a-input-password v-model:value="passwordForm.currentPassword"
                        placeholder="Enter current password" />
                </a-form-item>

                <a-form-item label="New Password" name="newPassword">
                    <a-input-password v-model:value="passwordForm.newPassword" placeholder="Enter new password" />
                </a-form-item>

                <a-form-item label="Confirm New Password" name="confirmPassword">
                    <a-input-password v-model:value="passwordForm.confirmPassword" placeholder="Confirm new password" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="passwordLoading" block>
                        <LockOutlined />
                        Change Password
                    </a-button>
                </a-form-item>
            </a-form>
        </a-modal>

    </a-card>

</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import {
    LockOutlined,
} from '@ant-design/icons-vue'

const passwordLoading = ref(false)
const changePassword_modal = ref(false)
// Password form
const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const passwordRules = {
    currentPassword: [{ required: true, message: 'Please enter your current password' }],
    newPassword: [
        { required: true, message: 'Please enter your new password' },
        { min: 8, message: 'Password must be at least 8 characters' }
    ],
    confirmPassword: [
        { required: true, message: 'Please confirm your new password' },
        {
            validator: (_rule: any, value: string) => {
                if (value !== passwordForm.newPassword) {
                    return Promise.reject('Passwords do not match')
                }
                return Promise.resolve()
            }
        }
    ]
}

const changePassword = async () => {
    passwordLoading.value = true
    try {
        // API call to change password
        await new Promise(resolve => setTimeout(resolve, 1000))
        message.success('Password changed successfully!')
        Object.assign(passwordForm, {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    } catch (error) {
        message.error('Failed to change password')
    } finally {
        passwordLoading.value = false
    }
}

</script>
<style scoped lang="scss">
.change-pasasword-card {
    border: none;
}

.change-pasasword-status {
    padding: 15px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 12px;
    color: white;
}

.change-pasasword-info h3 {
    color: white;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.change-pasasword-info p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
}

.change-pasasword-setup {
    padding: 20px 0;
}
</style>