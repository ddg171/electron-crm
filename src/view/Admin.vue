<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col>
      <!-- ここに中身 -->
      <el-card>
        <template #header>
          <el-row>
            <h2>データ全削除</h2>
          </el-row>
        </template>
        <el-form @submit.prevent="()=>{}">
          <el-form-item label="最終確認">
            <el-input v-model="check" placeholder="clearと入力してください" />
          </el-form-item>
          <el-form-item>
            <el-button @click="clear" size="large" type="danger" :disabled="check!=='clear'">データ全削除</el-button>
          </el-form-item>
        </el-form>
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
