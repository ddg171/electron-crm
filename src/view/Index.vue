<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col>
      <!-- ここに中身 -->
      <el-card>
        <template #header>
          <el-row>
            <h2>お知らせ</h2>
          </el-row>
        </template>
        <el-row>
          <el-col>
            <el-scrollbar height="100px" class="new-notify">
              <p v-for="item in 20" :key="item" class="scrollbar-demo-item">ここに通知が表示されます。</p>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-card>
      <!-- ショートカット -->
      <el-card>
        <template #header>
          <el-row>
            <h2>ショートカット</h2>
          </el-row>
        </template>
        <el-row>
          <el-Button :icon="Plus" size="large" role="router-link" @click="$router.push('/order/create')">注文受付</el-Button>
          <el-Button :icon="Check" size="large" @click="$router.push('/task')">品物受入</el-Button>
          <el-Button :icon="Search" size="large" @click="$router.push('/user')">顧客検索</el-Button>
        </el-row>
      </el-card>

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Search,Check,Plus } from '@element-plus/icons-vue'

</script>

<style scoped>
.new-notify {
  border: solid 1px black;
}
</style>
