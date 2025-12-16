// src/composables/useProfile.ts
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { injectable } from 'tsyringe'
import type { Profile } from '../domain/models/profile.model'

@injectable()
export default class ProfileComposable {
  profileLoading = ref(false)
  isModalVisible = ref(false)

  userProfile = reactive<Profile>({
    id: 0,
    username: '',
    email: '',
    is_active: false,
    is_2fa_enabled: false,
    is_verify: false,
    is_superuser: false,
    is_staff: false,
    avatar: '',
    groups: [],
    user_permissions: [],
    created: '',
    modified: '',
    is_removed: false,
  })

  profileForm = reactive<Profile>({ ...this.userProfile })

  profileRules = {
    firstName: [{ required: true, message: 'Please enter your first name' }],
    lastName: [{ required: true, message: 'Please enter your last name' }],
    phoneNumber: [{ required: true, message: 'Please enter your phone number' }]
  }

  getProfile = async () => {
    this.profileLoading.value = true
    try {
      // เรียก API GET /me
      await new Promise(resolve => setTimeout(resolve, 1000))
      Object.assign(this.userProfile, this.profileForm)
      message.success('Profile loaded successfully!')
    } catch (err) {
      message.error('Failed to load profile')
    } finally {
      this.profileLoading.value = false
    }
  }

  updateProfile = async () => {
    this.profileLoading.value = true
    // try {
    //   // เรียก API PUT /me
    //   await new Promise(resolve => setTimeout(resolve, 1000))
    //   Object.assign(userProfile, profileForm)
    //   message.success('Profile updated successfully!')
    //   isModalVisible.value = false
    // } catch (err) {
    //   message.error('Failed to update profile')
    // } finally {
    //   profileLoading.value = false
    // }
  }

  resetProfileForm = () => {
    // Object.assign(profileForm, userProfile)
  }
}
