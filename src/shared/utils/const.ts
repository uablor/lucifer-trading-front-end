export const GET_ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  USER: "user",
  ADMIN_OWNER: "admin-owner",
  USER_OWNER: "user-owner",
  STUDENT: "Students",
};

export const GET_PERMISSIONS = {
  REAL_ESTATE: {
    VIEW: "view-real-estate",
    CREATE: "create-real-estate",
    UPDATE: "edit-real-estate",
    DELETE: "delete-real-estate",
  },

  PAYMENT_REAL_ESTATE: {
    VIEW: "view-payment-real-estate",
    CREATE: "create-payment-real-estate",
    UPDATE: "edit-payment-real-estate",
    DELETE: "delete-payment-real-estate",
  },

  CUSTOMER: {
    VIEW: "view-customer",
    CREATE: "create-customer",
    UPDATE: "edit-customer",
    DELETE: "delete-customer",
  },

  PAYMENT_HISTORY: {
    VIEW: "view-payment-history",
    CONFIRM: "confirm-payment",
    REJECT: "reject-payment",
  },

  COUNTRY: {
    VIEW: "view-country",
    CREATE: "create-country",
    UPDATE: "edit-country",
    DELETE: "delete-country",
  },

  PROVINCE: {
    VIEW: "view-province",
    CREATE: "create-province",
    UPDATE: "edit-province",
    DELETE: "delete-province",
  },

  DISTRICT: {
    VIEW: "view-district",
    CREATE: "create-district",
    UPDATE: "edit-district",
    DELETE: "delete-district",
  },

  SERVICE_CHARGE: {
    VIEW: "view-service-charge",
    CREATE: "create-service-charge",
    UPDATE: "edit-service-charge",
    DELETE: "delete-service-charge",
  },

  APPOINTMENT: {
    VIEW: "view-appointment",
    CREATE: "create-appointment",
    UPDATE: "edit-appointment",
    DELETE: "delete-appointment",
  },

  RENT_BUY: {
    VIEW: "view-rent-buy",
    CREATE: "create-rent-buy",
    UPDATE: "edit-rent-buy",
    DELETE: "delete-rent-buy",
  },

  ADMIN_USER: {
    VIEW: "view-user",
    CREATE: "create-user",
    UPDATE: "edit-user",
    DELETE: "delete-user",
  },

  OWNER_USER: {
    VIEW: "view-user",
    CREATE: "create-user",
    UPDATE: "edit-user",
    DELETE: "delete-user",
  },

  REAL_ESTATE_TYPE: {
    VIEW: "view-real-estate-type",
    CREATE: "create-real-estate-type",
    UPDATE: "edit-real-estate-type",
    DELETE: "delete-real-estate-type",
  },

  FOOTER: {
    VIEW: "view-footer",
    CREATE: "create-footer",
    UPDATE: "edit-footer",
    DELETE: "delete-footer",
  },

  POLICY: {
    VIEW: "view-policy",
    CREATE: "create-policy",
    UPDATE: "edit-policy",
    DELETE: "delete-policy",
  },

  ABOUT_US: {
    VIEW: "view-about-us",
    CREATE: "create-about-us",
    UPDATE: "edit-about-us",
    DELETE: "delete-about-us",
  },

  WARNING: {
    VIEW: "view-warning",
    CREATE: "create-warning",
    UPDATE: "edit-warning",
    DELETE: "delete-warning",
  },

  BANK_QRCODE: {
    VIEW: "view-bank-qrcode",
    CREATE: "create-bank-qrcode",
    UPDATE: "edit-bank-qrcode",
    DELETE: "delete-bank-qrcode",
  },

  REPORT_REAL_ESTATE: {
    VIEW: "view-report-real-estate",
  },

  REPORT_RENT_Buy: {
    VIEW: "view-report-rent-buy",
  },
};

export const PERMISSION_KEY = "permissions";
export const PERMISSION_ROLE = "roles";
