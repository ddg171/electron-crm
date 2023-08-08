<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <!-- ここに中身 -->
      <el-row>
        <el-button @click="createModalShown=true">Create</el-button>
        <UserCreateModal :showClose="createModalShown" @create="getUsers" @click-outside="createModalShown=false" />
      </el-row>

      <el-row>
        <UserTable :user="users" @detail="showDetail" @delete="deleteUser" />
        <UserEditModal :user="selectedUser" @click-outside="closeDetail" @update="getUsers" />
      </el-row>
    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import { computed, ref ,onMounted} from "vue";
import {User} from "../../electron/model/users";
import {useUsersState} from "../composables/user"
import UserEditModal from "../components/modal/UserEdit.vue";
import UserCreateModal from "../components/modal/UserCreate.vue"
import UserTable from "../components/tables/UserTable.vue"

const createModalShown = ref<boolean>(false)
const {users,reset,get} =useUsersState()

const getUsers =async ()=>{
  createModalShown.value =false
  closeDetail()
  reset()
  await get()
}



const selecetId=ref<string|null>(null)
const showDetail = (id:string)=>{
  selecetId.value=id||null
}
const closeDetail=()=>{
  selecetId.value=null
}

const selectedUser = computed<User|null>(()=>{
  if(!selecetId.value) return null
  return users.value.find((u)=>u._id===selecetId.value) || null
})


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
