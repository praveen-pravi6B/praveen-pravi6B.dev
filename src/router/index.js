import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:gistId',
      component: () => import('../views/BlogPostView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
