import React from "react";
import { Navigate } from "react-router-dom";

// permissionFn recebe o usuário e retorna true/false
// user pode vir do context, redux, localStorage, etc.
export default function RequirePermission({ children, permissionFn, user }) {
    if (!permissionFn(user)) {
        return <Navigate to="/no-access" replace />;
    }
    return children;
}