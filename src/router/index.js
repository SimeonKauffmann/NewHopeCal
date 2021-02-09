import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Month from "../views/Month.vue";
import Edit from "@/views/Edit.vue";
import Week from "../views/Week.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/month",
    name: "Month",
    component: Month,
  },
  {
    path: "/edit/:day",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/",
    name: "Week",
    component: Week,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
