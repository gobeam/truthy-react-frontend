export function checkPermissionForComponent(roles, route) {
  if (!roles || !roles.permission) return false;
  if (route.defaultPermission) return true;
  return roles.permission.some(
    (role) =>
      role.resource === route.resource &&
      role.path === route.path &&
      role.method === route.method,
  );
}
