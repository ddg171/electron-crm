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
          <el-button @click="$router.push('/order/create')">新規受付</el-button>
        </el-row>
      </el-card>

      <el-card>
        <template #header>
          <el-row>
            <h2>注文一覧</h2>
          </el-row>
        </template>
        <el-row>
          <OrderTable :orders="orders" :users="users" @delete="deleteOrder" />
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>



<script lang="ts" setup>
import OrderTable from '../../components/tables/OrderTable.vue';
import { useOrdersState } from '../../composables/order';
import {useUsersState} from '../../composables/user';
const {orders,get:getOrders,reset:resetOrders} =useOrdersState()
const {users,get:getUsers,reset:resetUsers} =useUsersState()

const deleteOrder = async(id:string|undefined)=>{
  if(id){
    await window.orderAPI.delete(id)
  }
  init()
}

const init=async()=>{
  resetOrders()
  resetUsers()
  await getOrders()
  await getUsers()
}

init()
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
