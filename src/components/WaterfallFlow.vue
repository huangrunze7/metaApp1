<template>
  <!-- 下拉刷新容器 -->
  <div
    class="pull-refresh-container"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <!-- 下拉刷新提示 -->
    <div
      class="refresh-tip"
      v-show="pullDistance > 0"
      :style="{ transform: `translateY(${0}px)` }"
    >
      <div v-if="isRefreshing" class="loading-spinner"></div>
      <span v-else>{{ pullText }}</span>
    </div>
    <div class="pull-refresh-container">
      <div
        ref="scrollWrapper"
        class="scroll-wrapper"
        :style="{ transform: `translateY(${Math.max(0, pullDistance)}px)` }"
        @scroll="handleScroll"
      >
        <!-- 瀑布流内容 -->
        <div class="waterfall-container">
          <div
            class="waterfall-column"
            v-for="(column, index) in columns"
            :key="index"
          >
            <div class="waterfall-item" v-for="item in column" :key="item.id">
              <!-- 媒体内容区域 -->
              <div class="media-container">
                <!-- 图片类型 -->
                <img
                  v-if="item.type === 'image'"
                  class="main-media"
                  :src="item.media"
                  alt="主图"
                />

                <!-- 视频类型 -->
                <div v-else class="video-wrapper">
                  <video
                    class="main-media"
                    :poster="item.media.cover"
                    controls
                    preload="metadata"
                  >
                    <source :src="item.media.url" type="video/mp4" />
                  </video>
                </div>
              </div>

              <h3 class="title">{{ item.title }}</h3>
              <p class="desc">{{ item.desc }}</p>
              <div class="user-info">
                <img class="avatar" :src="item.avatar" alt="头像" />
                <span class="name">{{ item.name }}</span>
              </div>
              <!-- 统计数据 -->
              <div class="stats">
                <span>❤️ {{ item.likes }}</span>
                <span>💬 {{ item.comments }}</span>
                <span>👁️ {{ item.views }}</span>
              </div>
              <!-- 标签 -->
              <div class="tags">
                <span v-for="tag in item.tags" :key="tag" class="tag"
                  >#{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- 上拉加载提示 -->
        <div class="load-more-tip">
          <div v-if="loading" class="loading-text">加载中...</div>
          <div v-else-if="noMore" class="no-more-text">没有更多了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  columnCount: {
    type: Number,
    default: 2,
  },
  noMore: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["refresh", "load-more"]);

// 瀑布流布局
const columns = computed(() => {
  const result = Array.from({ length: props.columnCount }, () => []);
  props.list.forEach((item, index) => {
    result[index % props.columnCount].push(item);
  });
  return result;
});

// 下拉刷新逻辑
const pullDistance = ref(0);
const isRefreshing = ref(false);
const startY = ref(0);
const isAtTop = ref(true); // 新增：是否在顶部状态
const isAtBottom = ref(false); // 新增：是否在底部状态

const allowPullRefresh = ref(true);

const pullText = computed(() => {
  if (pullDistance.value < 60) return "下拉刷新";
  return "释放刷新";
});
const handleScroll = () => {
  const el = scrollWrapper.value;
  if (!el) return;

  // 判断是否在顶部
  isAtTop.value = el.scrollTop <= 0;

  // 判断是否在底部（新增）
  const threshold = 10; // 容错阈值
  isAtBottom.value =
    el.scrollHeight - (el.scrollTop + el.clientHeight) <= threshold;
};
const touchStart = (e) => {
  // 只有在顶部且不在刷新状态时才允许下拉
  if (!isAtTop.value || isRefreshing.value) return;
  startY.value = e.touches[0].clientY;
  allowPullRefresh.value = document.documentElement.scrollTop <= 0;
};

const touchMove = (e) => {
  // 如果在底部且向上滑动，则直接返回（新增）
  if (isAtBottom.value && e.touches[0].clientY < startY.value) {
    return;
  }
  // 只有在顶部且不在刷新状态时才处理下拉
  if (!isAtTop.value || isRefreshing.value) return;
  if (!allowPullRefresh.value || isRefreshing.value) return;
  const currentY = e.touches[0].clientY;
  const distance = currentY - startY.value;

  if (distance > 0) {
    e.preventDefault();
    pullDistance.value = Math.min(distance, 150);
  }
};

const touchEnd = () => {
  if (!isAtTop.value || isRefreshing.value) {
    pullDistance.value = 0;
    return;
  }
  if (isRefreshing.value) return;
  if (pullDistance.value >= 60) {
    isRefreshing.value = true;
    emit("refresh", () => {
      isRefreshing.value = false;
      pullDistance.value = 0;
    });
  } else {
    pullDistance.value = 0;
  }
};

// 上拉加载逻辑
const loading = ref(false);
// const noMore = ref(false);
const scrollWrapper = ref(null);

const checkLoadMore = () => {
  if (loading.value || props.noMore) return;

  const wrapper = scrollWrapper.value;
  const { scrollTop, scrollHeight, clientHeight } = wrapper;
  const threshold = 50; // 提前50px触发加载

  if (scrollHeight - (scrollTop + clientHeight) < threshold) {
    loading.value = true;
    emit("load-more", () => {
      loading.value = false;
    });
  }
};

onMounted(() => {
  scrollWrapper.value.addEventListener("scroll", checkLoadMore);
});

onUnmounted(() => {
  scrollWrapper.value?.removeEventListener("scroll", checkLoadMore);
});
</script>

<style scoped>
.media-container {
  position: relative;
  width: 100%;
  aspect-ratio: 3/2; /* 统一媒体元素宽高比 */
  overflow: hidden;
}

.main-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-wrapper {
  position: relative;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  pointer-events: none;
}

/* 视频悬停效果 */
.video-wrapper:hover .play-icon {
  background: rgba(255, 0, 0, 0.7);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .media-container {
    aspect-ratio: 1/1;
  }
}
.pull-refresh-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.refresh-tip {
  /* 只在需要时显示 */
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  transform: translateY(-100%);
}

.refresh-tip[v-show] {
  display: flex; /* 当v-show为true时显示 */
}
/* 下拉刷新容器 */
.pull-refresh-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

/* 下拉刷新提示 */
.refresh-tip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  transform: translateY(-100%);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 滚动容器 */
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

/* 瀑布流布局 */
.waterfall-container {
  display: flex;
  padding: 0.4rem;
  gap: 0.4rem;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* 瀑布流单项样式 */
.waterfall-item {
  background: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
  box-shadow: 0 0.04rem 0.12rem rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
}

.title {
  font-size: 0.36rem;
  padding: 0.2rem 0.24rem 0;
  margin: 0;
  color: #333;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.desc {
  font-size: 0.28rem;
  padding: 0.1rem 0.24rem 0;
  margin: 0;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.user-info {
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.avatar {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-right: 0.16rem;
}

.name {
  font-size: 0.24rem;
  color: #999;
}

/* 上拉加载提示 */
.load-more-tip {
  text-align: center;
  padding: 0.4rem 0;
  font-size: 0.28rem;
  color: #999;
}
.waterfall-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 16px;
}

.waterfall-item:hover {
  transform: translateY(-4px);
}

.media-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.main-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.content {
  padding: 12px;
}

.title {
  font-size: 16px;
  margin: 0 0 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #888;
}

.no-audio {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.name {
  font-size: 12px;
  color: #666;
}

.stats {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 12px;
  padding-left: 8px;
  color: #888;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  padding-left: 8px;
  padding-bottom: 8px;
}

.tag {
  font-size: 12px;
  color: #1e88e5;
  background: #e3f2fd;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
