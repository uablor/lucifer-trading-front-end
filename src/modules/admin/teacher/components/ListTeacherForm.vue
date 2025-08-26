<template>

  <a-table :sticky="{ offsetHeader: 0 }" :columns="customerList.columns" :data-source="store.state.data"
    :loading="customerList.find_loading.value" row-key="id" :pagination="false" :scroll="{ x: 1500 }">

    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          ຊື່
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record,index }">



      <template v-if="column.key === 'idex'">
        <span>{{ index  + 1  }}</span>
      </template>
      <template v-if="column.key === 'birth_date'">
        <span>{{ record.birth_date || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'gender'">
        <span :style="{ color: record.gender === 'male' ? 'blue' : record.gender === 'female' ? 'red' : '' }">
          {{ record.gender ? $t(`student.gender.${record.gender}`) : '-' }}
        </span>
      </template>
      <template v-else-if="column.key === 'district'">
        <span>{{ record.district || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'province'">
        <span>{{ record.province || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'updatedAt'">
        <span>{{ record.updatedAt || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'action'">
        <span class="table-action">

          <div v-if="store.query.is_active === Status.ACTIVE">
            <a-button type="primary" ghost @click="() => customerList.showModal(record)">{{ $t('common.edit')
            }}</a-button>
          </div>
          <div v-if="store.query.is_active === Status.INACTIVE">
            <a-popconfirm title="ທ່ານຕ້ອງການທີຈະກຸ້ຄືນຂໍ້ມຸນນີ້" ok-text="Yes" cancel-text="No"
              @confirm="customerList.confirm_restore(record.id)" @cancel="customerList.cancel_restore">
              <a-button type="primary" ghost>{{ $t('common.restore')
              }}</a-button>
            </a-popconfirm>
          </div>

          <a-button type="primary" danger ghost :loading="customerList.isDeleting.value"
            @click="customerList.openDeleteModal(record.id)" class="delete-trigger-btn">
            <template #icon>
              <DeleteOutlined />
            </template>
            {{ $t('common.delete') }}
          </a-button>

        </span>
      </template>
    </template>
  </a-table>
  <br>
  <a-pagination :current="store.state.pagination.currentPage" :total="store.state.pagination.total"
    :pageSize="store.state.pagination.limit" :showSizeChanger="true" :pageSizeOptions="['3', '5', '10', '20']"
    :locale="{ items_per_page: 'ລາຍການ' }" @change="customerList.handlePageChange"
    @showSizeChange="customerList.handlePageChange" />

  <UpdateStudentForm :composable="customerList" />
  <DeleteComponent :composable="customerList" class="delete-trigger-btn" />
</template>
<script lang="ts" setup>

import { onMounted } from 'vue';
import { container } from 'tsyringe';
import DeleteComponent from './crud/Delete.component.vue';
import TeacherFormService from '../composables/teacher.composable';
import UpdateStudentForm from './crud/UpdateTeacherForm.vue';
// import { DeleteType } from '@/shared/enums/deletetype.enum';
import { Status } from '@/shared/enums/pagination.query.enum';
import { useTeacherStore } from '../stores/use-teacher.store';

const store = useTeacherStore();
const customerList = container.resolve(TeacherFormService);
console.log("customerList", store.query);
onMounted(() => {
  customerList.fetchPage(store.query);
})
</script>


<style lang="scss" scoped>
// a-table {
//   margin-bottom: 20px;

.table-action {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.delete-trigger-btn {
  overflow: hidden;
}

;

// }</style>