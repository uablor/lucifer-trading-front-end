import type { Router } from "vue-router";
export function authGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.skipAuthCheck) {
      if (token && to.name === "auth.login") {
        return next({ name: "admin.student" });
      }
      return next();
    }
    if (token) {
      if (to.name === "auth.login") {
        return next({ name: "admin.student" });
      }
      return next();
    } else {
      if (to.name === "auth.register") {
        return next();
      }
      return next({ name: "auth.login" });
    }
  });
}
