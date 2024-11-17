import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/document',
  component: Layout,
  redirect: '/document/evaluation',
  name: 'documentRouter',
  meta: {
    title: '多级导航',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/pages/upload.vue'),
      meta: {
        title: '上传文档',
      },
    },
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/pages/manage.vue'),
      meta: {
        title: '查看文档',
      },
    },
    {
      path: 'evaluation',
      name: 'evaluation',
      component: () => import('@/views/pages/evaluation.vue'),
      meta: {
        title: '打分评估',
      },
    },
  ],
}

export default routes
