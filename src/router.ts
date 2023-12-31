
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "./view/Index.vue"
import User from './view/user/Index.vue';
import UserDetail from './view/user/_id.vue';
import Order from "./view/order/Index.vue";
import Admin from "./view/Admin.vue";
import OrderCreate from "./view/order/Create.vue";
import OrderDetail from "./view/order/_id.vue";
import Task from "./view/Task.vue"
import Supplier from "./view/Supplier.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", component: Index },
  { path: "/user", component: User },
  { path: "/user/:id", component: UserDetail },
  { path: "/supplier", component: Supplier },
  { path: "/order", component: Order },
  { path: "/order/create", component: OrderCreate },
  { path: "/order/:id", component: OrderDetail },
  { path: "/task", component: Task },
  { path: "/admin", component: Admin },
];

const basePath = "/";

const router = createRouter({
  history: createWebHistory(basePath),
  routes,
});

export default router;
