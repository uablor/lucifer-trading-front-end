<template>

    <a-card class="change-email-card">
        <div class="change-email-status">
            <a-row align="middle" justify="space-between">
                <a-col>
                    <div class="change-email-info">
                        <h3>
                            <SafetyOutlined />
                            Change Email
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
                    <a-button type="primary" @click="changeEmail_modal = true" size="large">
                        change Email
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <!-- 2FA Setup Modal -->
        <a-modal v-model:open="changeEmail_modal" title="Setup Two-Factor Authentication" :footer="null" width="400px">
            <a-form :model="EmailForm" :rules="EmailRules" layout="vertical" @finish="changeEmail">
                <a-form-item label="Current Email" name="currentEmail">
                    <a-input-Email v-model:value="EmailForm.currentEmail" placeholder="Enter current Email" />
                </a-form-item>

                <a-form-item label="New Email" name="newEmail">
                    <a-input-Email v-model:value="EmailForm.newEmail" placeholder="Enter new Email" />
                </a-form-item>

                <a-form-item label="Confirm New Email" name="confirmEmail">
                    <a-input-Email v-model:value="EmailForm.confirmEmail" placeholder="Confirm new Email" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="EmailLoading" block>
                        <LockOutlined />
                        Change Email
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

const EmailLoading = ref(false)
const changeEmail_modal = ref(false)
// Email form
const EmailForm = reactive({
    currentEmail: '',
    newEmail: '',
    confirmEmail: ''
})

const EmailRules = {
    currentEmail: [{ required: true, message: 'Please enter your current Email' }],
    newEmail: [
        { required: true, message: 'Please enter your new Email' },
        { min: 8, message: 'Email must be at least 8 characters' }
    ],
    confirmEmail: [
        { required: true, message: 'Please confirm your new Email' },
        {
            validator: (_rule: any, value: string) => {
                if (value !== EmailForm.newEmail) {
                    return Promise.reject('Emails do not match')
                }
                return Promise.resolve()
            }
        }
    ]
}

const changeEmail = async () => {
    EmailLoading.value = true
    try {
        // API call to change Email
        await new Promise(resolve => setTimeout(resolve, 1000))
        message.success('Email changed successfully!')
        Object.assign(EmailForm, {
            currentEmail: '',
            newEmail: '',
            confirmEmail: ''
        })
    } catch (error) {
        message.error('Failed to change Email')
    } finally {
        EmailLoading.value = false
    }
}

</script>
<style scoped lang="scss">
.change-email-card {
    border: none;
}

.change-email-status {
    padding: 24px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 12px;

}

.change-email-info h3 {
    color: white;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.change-email-info p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
}

.change-email-setup {
    padding: 20px 0;
}
</style>