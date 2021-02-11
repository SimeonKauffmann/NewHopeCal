import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Month from '../views/Month.vue';
import Edit from '@/views/Edit.vue';
import Week from '../views/Week.vue';
import Year from '../views/Year.vue';

Vue.use(VueRouter);

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
    path: '/edit/:day',
    name: 'Edit',
    component: Edit
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
];

const router = new VueRouter({
  routes
});

export default router;
