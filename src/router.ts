import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "./view/Index.vue"
import Customer from './view/Customer.vue';
import Order from "./view/Order.vue";
import Supplier from "./view/Supplier.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", component: Index },
  { path: "/customer", component: Customer },
  { path: "/supplier", component: Supplier },
  { path: "/order", component: Order },
];

const basePath = "/";

const router = createRouter({
  history: createWebHistory(basePath),
  routes, // `routes: routes` の短縮表記
});

export default router;
