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

      <template v-if="column.key === 'is_verified'">
        <a-badge :status="record.is_verified ? 'success' : 'error'"
          :text="record.is_verified ? 'ຢືນຢັນແລ້ວ' : 'ຍັງບໍ່ຢືນຢັນ'" />
      </template>


      <!-- <template v-if="column.key === 'roles'">
        <div v-if="record.roles && record.roles.length > 0" class="roles-container">
          <a-tag 
            v-for="role in record.roles" 
            :key="role" 
            color="blue"
            class="role-tag"
          >
            {{ role }}
          </a-tag>
        </div>
        <span v-else class="no-data">-</span>
      </template> -->
      <template v-if="column.key === 'roles'">
        <div>
          <a-popover v-if="record.roles?.length" placement="leftTop" trigger="click">
            <template #content>
              <a-list size="small" :data-source="record.roles" style="width: 250px;">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-tag color="blue" size="small">{{ item.display_name }}</a-tag>
                    <small style="color: #999; margin-left: 8px;">
                      {{ item.createdAt }}
                    </small>
                  </a-list-item>
                </template>
              </a-list>
            </template>

            <a-button type="primary" size="small" ghost>
              ດູ {{ record.roles.length }} role
            </a-button>
          </a-popover>

          <span v-else>-</span>
        </div>
      </template>

      <template v-if="column.key === 'permissions'">
        <div>
          <a-popover v-if="record.permissions?.length" placement="leftTop" trigger="click">
            <template #content>
              <a-list size="small" :data-source="record.permissions" style="width: 250px;">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-tag color="blue" size="small">{{ item.display_name }}</a-tag>
                    <small style="color: #999; margin-left: 8px;">
                      {{ item.createdAt }}
                    </small>
                  </a-list-item>
                </template>
              </a-list>
            </template>

            <a-button type="primary" size="small" ghost>
              ດູ {{ record.permissions.length }} Permissions
            </a-button>
          </a-popover>

          <span v-else>-</span>
        </div>
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
import UserAdminFormService from '../composables/user-admin.composable';
import UpdateStudentForm from './crud/UpdateTeacherForm.vue';
import { GetType, Status } from '@/shared/enums/pagination.query.enum';
import { useUserAdminStore } from '../stores/use-useradmin.store';
import { useRoleStore } from '../../role/stores/use-role.store';
import RoleFormService from '../../role/composables/role.composable';
const store = useUserAdminStore();
const storeRole = useRoleStore()
const customerList = container.resolve(UserAdminFormService);
const roleList = container.resolve(RoleFormService);

console.log("customerList", store.query);

onMounted(async () => {
  await customerList.fetchPage(store.query);
  storeRole.query.type = GetType.ALL;
  await roleList.fetchPage(storeRole.query);

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