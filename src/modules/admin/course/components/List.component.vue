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

    <template #bodyCell="{ column, record, index }">

      <template v-if="column.key === 'index'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.key === 'price'">
        <a-tag
          :color="record.price > 1000000 ? '#ff9900' : record.price > 0 ? 'green' : '#333'"
        >
          {{ formatCurrency(record.price, 'LAK') }}
        </a-tag>
      </template>
<template v-if="column.key === 'status'">
  <a-switch
    :checked="record.status === CourseStatus.OPEN "
    :checked-children="$t('common.open')"
    :un-checked-children="$t('common.close')"
    :loading="customerList.update_loading_status.value[record.id] === true"
    @change="(val: boolean) => customerList.toggleStatus(val, record)"
  />
</template>
      <template v-if="column.key === 'registration_start_date'">
        <a-tag color="blue">
          {{ record.registration_start_date }}
        </a-tag>
      </template>
      <template v-if="column.key === 'registration_end_date'">
        <a-tag color="red">
          {{ record.registration_end_date }}
        </a-tag>
      </template>
      <template v-if="column.key === 'start_date'">
        <a-tag color="blue">
          {{ record.start_date }}
        </a-tag>
      </template>
      
      <template v-if="column.key === 'end_date'">
        <a-tag color="red">
          {{ record.end_date }}
        </a-tag>
      </template>




      <template v-if="column.key === 'updatedAt'">
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
              <a-button type="primary" ghost>{{ $t('common.restore') }}</a-button>
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
  <DeleteComponent :composable="customerList" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { container } from 'tsyringe';
import DeleteComponent from './crud/Delete.component.vue';
import UserAdminFormService from '../composables/course.composable';
import UpdateStudentForm from './crud/UpdateTeacherForm.vue';
import { GetType, Status } from '@/shared/enums/pagination.query.enum';
import { useRoleStore } from '../../role/stores/use-role.store';
import RoleFormService from '../../role/composables/role.composable';
import { useCourseStore } from '../stores/use-Course.store';
import StudentFormService from '../../course_categorie/composables/course-categories.composable';
import TeacherFormService from '../../teacher/composables/teacher.composable';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { CourseStatus } from '../domain/models/course.model';
const store = useCourseStore();
const storeRole = useRoleStore()
const customerList = container.resolve(UserAdminFormService);
const roleList = container.resolve(RoleFormService);
const courseList = container.resolve(StudentFormService);
const teacher = container.resolve(TeacherFormService)
console.log("customerList", store.query);

onMounted(async () => {
  await customerList.fetchPage(store.query);
  storeRole.query.type = GetType.ALL;
  await roleList.fetchPage(storeRole.query);

  await courseList.fetchPage({
    type: GetType.ALL,
    is_active: Status.ACTIVE
  });
  await teacher.fetchPage({
    type: GetType.ALL,
    is_active: Status.ACTIVE
  });

})
</script>

<style lang="scss" scoped>
.table-action {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.delete-trigger-btn {
  overflow: hidden;
}

.roles-container,
.permissions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 200px;
}

.role-tag,
.permission-tag {
  margin: 2px 0;
  font-size: 12px;
}

.no-data {
  color: #999;
  font-style: italic;
}


.roles-container,
.permissions-container {
  &.vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>