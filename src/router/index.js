import Vue from 'vue'
import VueRouter from 'vue-router'
import Week from '../views/Week.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Week',
    component: Week
  },
]

const router = new VueRouter({
  routes
})

export default router
