import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcsspxtorem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "src/mock", // mock文件存放目录
      localEnabled: true, // 开发环境启用
      logger: true, // 显示请求日志
      watchFiles: true, // 监视文件变化
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:5173",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcsspxtorem({
          rootValue: 37.5, // 设计稿宽度/10，例如设计稿375px，则37.5
          propList: ["*"],
          selectorBlackList: [".norem"], // 过滤掉.norem-开头的class，不进行rem转换
        }),
      ],
    },
  },
});
