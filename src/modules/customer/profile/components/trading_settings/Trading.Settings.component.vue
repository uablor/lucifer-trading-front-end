<template>
           <a-card title="Trading Settings" class="trading-card">
          <a-form
            :model="tradingForm"
            layout="vertical"
            @finish="updateTradingSettings"
          >
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Default Trading Pair">
                  <a-select v-model:value="tradingForm.defaultPair" placeholder="Select default pair">
                    <a-select-option value="BTC/USDT">BTC/USDT</a-select-option>
                    <a-select-option value="ETH/USDT">ETH/USDT</a-select-option>
                    <a-select-option value="BNB/USDT">BNB/USDT</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Default Order Type">
                  <a-select v-model:value="tradingForm.defaultOrderType" placeholder="Select order type">
                    <a-select-option value="market">Market Order</a-select-option>
                    <a-select-option value="limit">Limit Order</a-select-option>
                    <a-select-option value="stop">Stop Order</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="Risk Level">
                  <a-slider 
                    v-model:value="tradingForm.riskLevel" 
                    :min="1" 
                    :max="10" 
                    :marks="riskMarks"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Auto-Trading">
                  <a-switch 
                    v-model:checked="tradingForm.autoTrading"
                    checked-children="ON"
                    un-checked-children="OFF"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="tradingLoading">
                <SettingOutlined />
                Update Trading Settings
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>

        <!-- Notification Settings -->
        <a-card title="Notification Preferences" class="notification-card">
          <div class="notification-settings">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="Price Alerts" description="Get notified when prices reach your target levels" />
                <a-switch v-model:checked="notificationSettings.priceAlerts" />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="Order Execution" description="Notifications for completed trades" />
                <a-switch v-model:checked="notificationSettings.orderExecution" />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="Market News" description="Important market updates and news" />
                <a-switch v-model:checked="notificationSettings.marketNews" />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="Security Alerts" description="Login attempts and security notifications" />
                <a-switch v-model:checked="notificationSettings.securityAlerts" />
              </a-list-item>
            </a-list>
          </div>
        </a-card>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'

import { message } from 'ant-design-vue'
import {
  SettingOutlined,
} from '@ant-design/icons-vue'
const tradingLoading = ref(false)

// Trading form
const tradingForm = reactive({
  defaultPair: 'BTC/USDT',
  defaultOrderType: 'limit',
  riskLevel: 5,
  autoTrading: false
})

const riskMarks = {
  1: 'Low',
  5: 'Medium',
  10: 'High'
}

// Notification settings
const notificationSettings = reactive({
  priceAlerts: true,
  orderExecution: true,
  marketNews: false,
  securityAlerts: true
})


const updateTradingSettings = async () => {
  tradingLoading.value = true
  try {
    // API call to update trading settings
    await new Promise(resolve => setTimeout(resolve, 1000))
    message.success('Trading settings updated successfully!')
  } catch (error) {
    message.error('Failed to update trading settings')
  } finally {
    tradingLoading.value = false
  }
}

</script>

<style scoped lang="scss">

.trading-card,
.notification-card,
.activity-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>