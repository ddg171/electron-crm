<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col>
      <!-- ここに中身 -->
      <el-card>
      <el-input v-model="check" />
      <el-button @click="clear" size="large" type="danger" :disabled="check!=='clear'">データ全削除</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const check = ref("")
const clear =async()=>{
    const taskList:Promise<any>[] =[
        window.taskAPI._clear(),
        window.itemAPI._clear(),
        window.userAPI._clear(),
        window.orderAPI._clear(),
    ]
    const result = await Promise.all(taskList)
    console.log(result)
}

</script>

<style scoped>
.new-notify {
  border: solid 1px black;
}
</style>
