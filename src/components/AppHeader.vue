<template>
  <el-header id="header">
    <el-row class="header-row" justify="space-between">
      <el-col class="header-col" :span="12">
        <h1>
          <RouterLink to="/">
            APP
          </RouterLink>
        </h1>
      </el-col>
      <el-col :span="12">
        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          id="nav-links">
          <el-menu-item>
            <RouterLink to="/">TOP</RouterLink>
          </el-menu-item>
          <el-menu-item>
            <RouterLink to="/customer">顧客</RouterLink>
          </el-menu-item>
          <el-menu-item>
            <RouterLink to="/order">注文</RouterLink>
          </el-menu-item>
          <el-menu-item>
            <RouterLink to="/supplier">取引先</RouterLink>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
</script>

<style scoped>
#header {
  height: 4rem;
  position: sticky;
  top: 0;
  background-color: #409EFF;
  color: #FFFFFF;
}

.header-row {
  height: 100%;
}

h1 {
  text-align: left;
}

nav {
  height: 100%
}

#nav-links {
  height: 100%;
  align-items: center;
}
</style>