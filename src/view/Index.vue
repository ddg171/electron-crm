<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col>
      <!-- ここに中身 -->
      <el-row>
        <el-col>
          <!-- <h2>通知</h2> -->
          <!-- 通知BOX -->
          <div>
            <h3>通知</h3>
            <el-scrollbar height="64px" class="new-notify">
              <p v-for="item in 20" :key="item" class="scrollbar-demo-item">ここに通知が表示されます。</p>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <!-- ショートカット -->
      <el-row>
        <el-col>
          <div>
            <h3>ショートカット</h3>
            <el-row>
              <el-Button :icon="Plus" size="large" role="router-link"
                @click="$router.push('/order/create')">注文受付</el-Button>
              <el-Button :icon="Check" size="large" @click="$router.push('/task')">品物受入</el-Button>
              <el-Button :icon="Search" size="large">顧客検索</el-Button>
            </el-row>

          </div>
        </el-col>
      </el-row>
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
