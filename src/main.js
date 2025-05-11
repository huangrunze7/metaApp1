import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css/normalize.css";
import "amfe-flexible";
import "@/assets/css/base.scss";
import "./mock/waterfall"; // 引入mock配置
createApp(App).use(router).mount("#app");
