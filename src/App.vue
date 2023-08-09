<template>
  <AppHeader />
  <el-container id="container" direction="vertical">
    <el-main id="main" class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
  <div id="portal">
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "./components/AppHeader.vue"

</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(90deg, #e8e8e8 0%, #fff 100%);
}



#container {
  max-width: 100%;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}

.page-view {
  width: 1024px;
  height: 100%;
  gap: 2rem;
}

.el-card {
  margin-bottom: 1rem;
}
</style>
