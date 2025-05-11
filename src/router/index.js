import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import WaterfallDemo from "@/views/WaterfallDemo.vue";
let base = "/metaApp1";

const routes = [
  {
    path: base,
    name: "Home",
    component: Home,
  },
  {
    path: `${base}/waterfall`,
    name: "Waterfall",
    component: WaterfallDemo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
