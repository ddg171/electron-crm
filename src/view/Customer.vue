<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <!-- ここに中身 -->
      <el-row>
        <NewUserForm @submit="getUsers" />
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名前" />
          <el-table-column prop="_id" label="ID" />
        </el-table>
      </el-row>

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {User} from "../../electron/model/users";
import NewUserForm from "../components/form/user/Insert.vue"

const tableData = ref<User[]>([])

const getUsers =async ()=>{
  tableData.value=[]
  console.log("find user")
  const result = await window.userAPI.find({})
  console.log(result)
  console.log("find userend")

  tableData.value =result
}

getUsers()

</script>

<style scoped>
.time {
  color: orange;
  margin: 0;
}

#content {
  min-height: calc(25vh - 36px);
}
</style>
