<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-row>
        <el-col>
          <RouterLink to="/order/create">新規受付</RouterLink>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <OrderTable :orders="orders" :users="users" @delete="getOrders" />
        </el-col>
      </el-row>

      <!-- ここに中身 -->
      注文
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import OrderTable from '../../components/tables/OrderTable.vue';
import { useOrdersState } from '../../composables/order';
import {useUsersState} from '../../composables/user';
const {orders,get,reset} =useOrdersState()
const {users,get:getUser} =useUsersState()

const getOrders = async()=>{
  reset()
  await get()
}

getOrders()
getUser()
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
