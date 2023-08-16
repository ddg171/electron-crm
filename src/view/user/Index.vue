<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>操作</h2>
          </el-row>

        </template>
        <el-row>
          <el-button @click="createModalShown=true">新規追加</el-button>
          <UserCreateModal :showClose="createModalShown" @create="getUsers" @click-outside="createModalShown=false" />
        </el-row>
      </el-card>

      <el-card>
        <template #header>
          <el-row>
            <h2>顧客一覧</h2>
          </el-row>
        </template>
        <el-row>
          <UserTable :user="users" @detail="showDetail" @delete="deleteUser" />
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>



<script lang="ts" setup>
import { ref ,onMounted} from "vue";

import {useUsersState} from "../../composables/user"

import UserCreateModal from "../../components/modal/UserCreate.vue"
import UserTable from "../../components/tables/UserTable.vue"
import {useRouter} from "vue-router";

const router = useRouter()

const createModalShown = ref<boolean>(false)
const {users,reset,get} =useUsersState()

const getUsers =async ()=>{
  createModalShown.value =false
  reset()
  await get()
}




const showDetail = (id:string)=>{
  router.push("/user/"+id)
}




const deleteUser = async(id:string)=>{
  await window.userAPI.delete(id)
  await getUsers()
}

onMounted(async () => {
  await getUsers()
})


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
