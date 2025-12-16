<template>
            <a-card title="Recent Activities" class="activity-card">
          <a-table 
            :columns="activityColumns" 
            :data-source="activityData" 
            :pagination="{ pageSize: 10 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="getStatusColor(record.status)">
                  {{ record.status }}
                </a-tag>
              </template>
              <template v-if="column.key === 'type'">
                <a-tag :color="getTypeColor(record.type)">
                  {{ record.type }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-card>
</template>

<script setup lang="ts">
import { ref} from 'vue'
// Activity data
const activityColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Activity', dataIndex: 'activity', key: 'activity' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'IP Address', dataIndex: 'ipAddress', key: 'ipAddress' }
]

const activityData = ref([
  {
    key: '1',
    date: '2024-01-15 10:30:00',
    activity: 'Login',
    type: 'Security',
    status: 'Success',
    ipAddress: '192.168.1.100'
  },
  {
    key: '2',
    date: '2024-01-15 09:15:00',
    activity: 'Buy BTC',
    type: 'Trading',
    status: 'Completed',
    ipAddress: '192.168.1.100'
  },
  {
    key: '3',
    date: '2024-01-14 16:45:00',
    activity: 'Password Change',
    type: 'Security',
    status: 'Success',
    ipAddress: '192.168.1.100'
  }
])


const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
    case 'completed':
      return 'green'
    case 'pending':
      return 'orange'd
    case 'failed':
      return 'red'
    default:
      return 'default'
  }
}

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'trading':
      return 'blue'
    case 'security':
      return 'red'
    case 'deposit':
      return 'green'
    case 'withdrawal':
      return 'orange'
    default:
      return 'default'
  }
}
</script>

<style scoped lang="scss">
.activity-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>