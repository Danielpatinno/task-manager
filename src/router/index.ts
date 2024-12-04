import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Agenda from '../views/Agenda.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import RegisterForm from '../components/Login/LoginForm.vue'
import LoginForm from '../components/Register/RegisterForm.vue'

const routes = [
  {
    path: '/',
    component:  Login,
    children: [
      {
        path: '', 
        component: LoginForm,
      },
      {
        path: 'login', 
        component: RegisterForm,
      },
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem('task_manager_session')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router