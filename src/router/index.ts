import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/index.vue'),// 懒加载
    meta: {
      showFooter: true, // 是否显示底部导航
      requireAuth: false, // 是否需要授权，即token
    }
  },
  {
    path: '/webpack',
    component: () => import('@/pages/webpack.vue'),// 懒加载
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: {
      requireAuth: false,
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  console.log('to==>', to, token);

  // next()
  // return
  // if (to.meta.requireAuth && !token) { // 判断登录权限 
  if (!token && to.path !== '/login') { // 判断登录权限
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next()
  }
})

export default router;
