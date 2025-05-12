<template>
  <div class="waterfall-page">
    <WaterfallFlow
      :list="waterfallList"
      :noMore="noMore"
      :column-count="2"
      @refresh="handleRefresh"
      @load-more="handleLoadMore"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import WaterfallFlow from "@/components/WaterfallFlow.vue";
import { useRoute } from "vue-router";

const waterfallList = ref([]);
const page = ref(1);
const loading = ref(false);
const noMore = ref(false);
const route = useRoute();
const type = route.query.type;
// 加载数据函数
const loadData = async (isRefresh = false) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const res = await axios.get("/api/waterfall/list", {
      params: {
        page: page.value,
        pageSize: 10,
        type: type,
        timestamp: Date.now(), // 添加时间戳防止缓存
      },
    });
    console.log(res, "res");
    if (isRefresh) {
      waterfallList.value = res.data.data;
    } else {
      waterfallList.value = [...waterfallList.value, ...res.data.data];
    }

    // 模拟最多加载5页
    if (page.value >= 5) {
      noMore.value = true;
    }
  } catch (error) {
    console.error("加载数据失败:", error);
  } finally {
    loading.value = false;
  }
};

// 下拉刷新
const handleRefresh = (done) => {
  page.value = 1;
  noMore.value = false;
  loadData(true).finally(() => done());
};

// 上拉加载更多
const handleLoadMore = (done) => {
  if (noMore.value) {
    done();
    return;
  }

  page.value += 1;
  loadData().finally(() => done());
};
// 初始化加载
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.waterfall-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 0.48rem;
  text-align: center;
  padding: 0.4rem 0;
  margin: 0;
  color: #333;
  flex-shrink: 0;
}
</style>
