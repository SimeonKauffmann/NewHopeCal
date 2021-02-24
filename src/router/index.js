import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Month from '../views/Month.vue'
import Day from '../views/Day.vue'
import Week from '../views/Week.vue'
import Year from '../views/Year.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/month',
    name: 'Month',
    component: Month
  },
  {
    path: '/Day/:day',
    name: 'Day',
    component: Day
  },
  {
    path: '/week',
    name: 'Week',
    component: Week
  },
  {
    path: '/year',
    name: 'Year',
    component: Year
  }
]

const router = new VueRouter({
  routes
})

export default router
