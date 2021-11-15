import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '@/pages/index'),// 懒加载
    meta: {
      showFooter: true, // 是否显示底部导航
      requireAuth: false, // 是否需要授权，即token
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      requireAuth: false,
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth && !token) { // 判断登录权限
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next()
  }
})

export default router;
