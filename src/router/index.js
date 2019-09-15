import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar.vue'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Tabbar,
    children: [{
      name: 'home',
      path: '',
      component: Home
    }, {
      name: 'user',
      path: '/user',
      component: () =>
                    import(/* webpackChunkName: "about" */ '../views/User.vue')
    }, {
      name: 'qa',
      path: '/qa',
      component: () =>
                    import(/* webpackChunkName: "about" */ '../views/qa/index.vue')
    }, {
      name: 'video',
      path: '/video',
      component: () =>
                    import(/* webpackChunkName: "about" */ '../views/video/index.vue')
    }]
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/user-profile/index.vue')
  },
  {
    path: '/follow',
    name: 'follow',
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/follow/index')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/Chat.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/search-result/:q',
    name: 'search-result',
    // 路由跳转的时候，对应的组件把动态路由参数，传递给组件
    props: true,
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/SearchResult.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    // 路由跳转的时候，对应的组件把动态路由参数，传递给组件
    props: true,
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/detail/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
                import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
  ]
})
