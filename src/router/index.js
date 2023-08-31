import { createRouter, createWebHashHistory } from "vue-router";
import LoginV from "../views/LoginV.vue";
import DashboardV from "../views/DashboardV.vue";
// import BukuInduk from "../views/BukuInduk.vue";
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginV,
  },

  {
    path: '/dashboard',
    name: 'DashboardV',
    component: DashboardV,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.loggedInUser) {
      // Cek local storage untuk pengguna yang sudah login
      const loggedInUserFromLocalStorage = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUserFromLocalStorage) {
        store.commit('setLoggedInUser', loggedInUserFromLocalStorage);
        store.commit('setSidebarVisibility', true);
        next();
      } else {
        next({ name: 'Login' }); // Redirect to login if not logged in
      }
    } else {
      store.commit('setSidebarVisibility', true);
      next();
    }
  } else {
    next();
  }
});

export default router;
