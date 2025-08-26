import { GET_ROLES, PERMISSION_KEY } from "../utils/const";

export function validationPermissions(permission: any): any {
  const rolesString = localStorage.getItem("roles") || "";
  const currentRoles = rolesString ? JSON.parse(rolesString) : [];

  if (
    currentRoles.includes(GET_ROLES.SUPER_ADMIN) ||
    currentRoles.includes(GET_ROLES.ADMIN) ||
    currentRoles.includes(GET_ROLES.ADMIN_OWNER)
  ) {
    return false;
  } else {
    const permissionsString = localStorage.getItem(PERMISSION_KEY) || "";
    const currentPermissions = permissionsString
      ? JSON.parse(permissionsString)
      : [];

    return !currentPermissions.includes(permission);
  }
}
