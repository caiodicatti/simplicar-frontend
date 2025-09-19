export function canSeeStores(user) {
    return user?.role === "superadmin";
}

export function canAdminUsers(user) {
    return ["admin", "superadmin"].includes(user?.role);
}

export function canManageUsers(user) {
    return ["admin", "superadmin", "manager"].includes(user?.role);
}

export function canOperateUsers(user) {
    return ["admin", "superadmin", "manager", "operator"].includes(user?.role);
}


// Adicione outros controles conforme necessidade...