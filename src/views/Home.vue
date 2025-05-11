<template>
  <div class="home">
    <h1>首页</h1>
    <router-link to="/waterfall" class="nav-link">查看瀑布流</router-link>
  </div>
</template>

<style scoped>
.home {
  padding: 1rem;
  text-align: center;
}

.nav-link {
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.3rem 0.6rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 0.2rem;
  font-size: 0.36rem;
}
</style>
