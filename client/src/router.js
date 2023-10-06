import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Home.vue'
import Signup from './views/Signup.vue'
import Group from './views/Group.vue'
import AdminPageVue from './views/AdminPage.vue'
import { getCurrentUser } from './auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresNoAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/group/:id',
      name: 'group',
      component: Group
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { requiresNoAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPageVue
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()

  if (to.matched.some((record) => record.meta.requiresNoAuth) && user) {
    next('/dashboard')
  } else if (
    !to.matched.some((record) => record.meta.requiresNoAuth) &&
    !user
  ) {
    next('/login')
  } else {
    next()
  }
})

export default router
