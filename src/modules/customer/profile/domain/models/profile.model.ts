export interface Profile {
  id: number
  username: string
  email: string
  is_active: boolean
  is_2fa_enabled: boolean
  is_verify: boolean
  is_superuser: boolean
  is_staff: boolean
  avatar: string
  groups: any[] // ถ้า structure ของ group มี schema ชัดเจนให้เปลี่ยนจาก any[]
  user_permissions: any[] // เช่นเดียวกัน
  created: string // หรือ Date ถ้าจะแปลงเป็น Date
  modified: string // หรือ Date
  is_removed: boolean
}
