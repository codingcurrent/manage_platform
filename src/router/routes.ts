// 定义常量路由---即所有用户都能访问到的路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/System/Login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true, //代表路由标题在菜单中是否隐藏  true为隐藏
    },
  },
  {
    path: '/',
    component: () => import('@/components/Layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '',
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/Screen/index.vue'),
    name: 'Histogram',
    meta: {
      title: '数字大屏',
      icon: 'Histogram',
    },
  },
  {
    path: '/404',
    component: () => import('@/views/System/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

export const asyncRoutes = [
  {
    path: '/acl',
    component: () => import('@/components/Layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/permission',
        component: () => import('@/views/Acl/Permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/Acl/Role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/user',
        component: () => import('@/views/Acl/User/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/components/Layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/attr',
    children: [
      {
        path: '/product/attr',
        component: () => import('@/views/Product/Attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/Product/Sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/Product/Spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/tradeMark',
        component: () => import('@/views/Product/tradeMark/index.vue'),
        name: 'TradeMark',
        meta: {
          title: '品牌管理',
          icon: 'ChromeFilled',
        },
      },
    ],
  },
]

export const anyRoute = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  },
]
