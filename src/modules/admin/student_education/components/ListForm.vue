<template>
  <div class="student-profile-container">
    <a-card class="profile-header-card" :loading="useStudentComposable.find_loading.value">
      <template #title>
        <div class="profile-title">
          <a-avatar :size="48" class="profile-avatar">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <div class="title-content">
            <h2 class="student-name">{{ store.student.data?.name || 'Unknown' }} {{ store.student.data?.surname || '' }}
            </h2>
            <a-tag color="blue" class="student-id-tag">
              <IdcardOutlined /> ID: {{ router.currentRoute.value.query.id }}
            </a-tag>
          </div>
        </div>
      </template>

      <div class="profile-content">
        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12" :md="8">
            <div class="info-item">
              <div class="info-label">
                <UserOutlined class="info-icon" />
                {{ $t('student.name') || 'Full Name' }}
              </div>
              <div class="info-value">
                {{ `${store.student.data?.name || '-'} ${store.student.data?.surname || ''}` }}
              </div>
            </div>
          </a-col>

          <a-col :xs="24" :sm="12" :md="8">
            <div class="info-item">
              <div class="info-label">
                <TeamOutlined class="info-icon" />
                {{ $t('student.gender') || 'Gender' }}
              </div>
              <div class="info-value">
                <a-tag :color="getGenderColor(store.student.data?.gender || '')">
                  {{ store.student.data?.gender || '-' }}
                </a-tag>
              </div>
            </div>
          </a-col>

          <a-col :xs="24" :sm="12" :md="8">
            <div class="info-item">
              <div class="info-label">
                <MailOutlined class="info-icon" />
                {{ $t('student.email') || 'Email' }}
              </div>
              <div class="info-value">
                <a :href="`mailto:${store.student.data?.email}`" class="email-link">
                  {{ store.student.data?.email || '-' }}
                </a>
              </div>
            </div>
          </a-col>

          <a-col :xs="24" :sm="12" :md="8">
            <div class="info-item">
              <div class="info-label">
                <EnvironmentOutlined class="info-icon" />
                {{ $t('student.address') || 'Address' }}
              </div>
              <div class="info-value">
                {{ store.student.data?.district || '-' }}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <a-card class="education-card">
      <template #title>
        <div class="section-title">
          <BookOutlined class="section-icon" />
          {{ $t('student.education_history') || 'Education History' }}
          <a-badge :count="Array.isArray(store.student.data?.educations) ? store.student.data.educations.length : 0"
            :number-style="{ backgroundColor: '#52c41a' }" class="education-count" />
        </div>
      </template>

      <template #extra>
        <CreateForm />
      </template>

      <!-- Education Table -->
      <div v-if="Array.isArray(store.student.data?.educations) && store.student.data.educations.length > 0">
        <a-table :columns="useStudentComposable.columns" :data-source="store.student.data.educations"
          :loading="useStudentComposable.find_loading.value" row-key="id" class="education-table" :pagination="false"
          :scroll="{ x: 1200 }" size="middle" bordered>
          <template #bodyCell="{ column, record, index }">
            <!-- Row Number -->
            <template v-if="column.key === 'index'">
              <div class="row-number">{{ index + 1 }}</div>
            </template>

            <!-- Status -->
            <template v-if="column.key === 'status'">
              <a-tag :color="record.status === educationStatus.studying ? 'processing' : 'success'" class="status-tag">
                <template #icon>
                  <CheckCircleOutlined v-if="record.status === educationStatus.studying" />
                  <ClockCircleOutlined v-else />
                </template>
                {{ record.status }}
              </a-tag>
            </template>

            <!-- Action Buttons -->
            <template v-else-if="column.key === 'action'">
              <div class="table-actions">
                <a-tooltip :title="$t('common.edit') || 'Edit'">

                  <a-button type="primary" ghost @click="() => useStudentComposable.showModal(record)">
                    <EditOutlined />{{ $t('common.edit')
                    }}
                  </a-button>
                </a-tooltip>

                <a-button type="primary" danger ghost :loading="useStudentComposable.isDeleting.value"
                  @click="useStudentComposable.openDeleteModal(record.id)" class="delete-trigger-btn">
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                  {{ $t('common.delete') }}
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-education-state">
        <a-empty :description="$t('student.no_education_records') || 'No education records found'"
          :image="Empty.PRESENTED_IMAGE_SIMPLE">
          <CreateForm />

          {{ $t('student.add_first_education') || 'Add First Education Record' }}

        </a-empty>
      </div>
    </a-card>

    <!-- Statistics Cards -->
    <a-row :gutter="16" class="stats-section">
      <a-col :xs="24" :sm="8">
        <a-card class="stat-card">
          <a-statistic :title="$t('student.total_education') || 'Total Education Records'"
            :value="Array.isArray(store.student.data?.educations) ? store.student.data.educations.length : 0"
            :value-style="{ color: '#3f8600' }">
            <template #prefix>
              <BookOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="8">
        <a-card class="stat-card">
          <a-statistic :title="$t('student.currently_studying') || 'Currently Studying'" :value="getStudyingCount()"
            :value-style="{ color: '#1890ff' }">
            <template #prefix>
              <ClockCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="8">
        <a-card class="stat-card">
          <a-statistic :title="$t('student.completed') || 'Completed'" :value="getCompletedCount()"
            :value-style="{ color: '#52c41a' }">
            <template #prefix>
              <CheckCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>

  <DeleteComponent :composable="useStudentComposable" class="delete-trigger-btn" />
  <UpdateComponent :composable="useStudentComposable" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {  Empty } from 'ant-design-vue';
import { container } from 'tsyringe';
import StudentEducationFormService from '../composables/studenteducation.composable';
import { useStudentEducationStore } from '../stores/use-student-education.store';
import { educationStatus } from '../domain/models/education.model';
import CreateForm from './crud/CreateForm.vue';
import DeleteComponent from './crud/Delete.component.vue';
import UpdateComponent from './crud/UpdateStudentForm.vue';
import {
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  EnvironmentOutlined,
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  IdcardOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const useStudentComposable = container.resolve(StudentEducationFormService);
const store = useStudentEducationStore();

const getGenderColor = (gender: string) => {
  switch (gender?.toLowerCase()) {
    case 'male': return 'blue';
    case 'female': return 'pink';
    default: return 'default';
  }
};

const getStudyingCount = () => {
  if (!Array.isArray(store.student.data?.educations)) return 0;
  return store.student.data.educations.filter(edu => edu.status === educationStatus.studying).length;
};

const getCompletedCount = () => {
  if (!Array.isArray(store.student.data?.educations)) return 0;
  return store.student.data.educations.filter(edu => edu.status !== educationStatus.studying).length;
};

// const handleEditProfile = () => {
//   message.info('Edit profile functionality to be implemented');
// };

// const handlePrintProfile = () => {
//   window.print();
// };

// const handleAddEducation = () => {
//   useStudentComposable.showModal(1)
// };

onMounted(async () => {
  const id = router.currentRoute.value.query.id as string;
  if (id) {
    await useStudentComposable.findOneStudent(parseInt(id));
  }
});
</script>

<style lang="scss" scoped>
.student-profile-container {
  min-height: 100vh;

  .profile-header-card {
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    .profile-title {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 0px;

      .profile-avatar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .title-content {
        .student-name {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #262626;
        }

        .student-id-tag {
          margin-top: 4px;
          font-size: 12px;
        }
      }
    }

    .profile-content {
      margin-top: 24px;

      .info-item {
        padding: 16px;
        background: #fafafa;
        border-radius: 8px;
        border-left: 4px solid #1890ff;

        .info-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #8c8c8c;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 8px;

          .info-icon {
            color: #1890ff;
          }
        }

        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #262626;

          .email-link {
            color: #1890ff;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .education-card {
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 600;

      .section-icon {
        color: #1890ff;
        font-size: 20px;
      }

      .education-count {
        margin-left: 8px;
      }
    }

    .education-table {
      .row-number {
        font-weight: 500;
        color: #8c8c8c;
      }

      .status-tag {
        font-weight: 500;
      }

      .table-actions {
        display: flex;
        gap: 4px;
        justify-content: center;
        align-items: center;
      }
    }

    .empty-education-state {
      padding: 60px 0;
      text-align: center;
    }
  }

  .stats-section {
    .stat-card {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .student-profile-container {
    padding: 16px;

    .profile-header-card {
      .profile-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;

        .title-content {
          .student-name {
            font-size: 20px;
          }
        }
      }
    }

    .education-table {
      .ant-table-tbody>tr>td {
        padding: 8px 4px;
      }
    }
  }
}

// Print styles
@media print {
  .student-profile-container {
    background: white;
    padding: 0;

    .profile-header-card,
    .education-card {
      box-shadow: none;
      border: 1px solid #d9d9d9;
    }

    .table-actions,
    .ant-card-extra {
      display: none !important;
    }
  }
}
</style>