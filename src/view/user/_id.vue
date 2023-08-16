<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>ユーザー詳細</h2>
          </el-row>
        </template>
        <UserEditForm v-if="user" :initial-value="user" @submit="init" />
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>操作</h2>
          </el-row>
        </template>
        <el-row>
          <el-button size="large" @click="$router.push(`/order/create?userId=${$route.params.id}`)">新規受付</el-button>
          <el-button size="large">削除</el-button>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>品物一覧</h2>
          </el-row>
        </template>
        <ItemTable :items="items" @delete="deleteItem" />
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>注文履歴</h2>
          </el-row>
        </template>
        <OrderTable v-if="orders" :orders="orders" :users="user?[user]:[]" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import {useRoute} from "vue-router";
import { useUserState } from "../../composables/user";
import {useItemsState} from "../../composables/item";
import UserEditForm from "../../components/form/user/Edit.vue";
import {useOrdersState} from "../../composables/order";
import OrderTable from "../../components/tables/OrderTable.vue";
import ItemTable from "../../components/tables/ItemTable.vue";

const route = useRoute()

const {user,get:getUser,reset:resetUser} = useUserState()
const {orders,get:getOrders,reset:resetOrders} = useOrdersState()
const {items,get:getItems,reset:resetItems} = useItemsState()

const deleteItem = async (id:string) => {
  console.log(id)
  await window.itemAPI.delete(id)
  await init()
}

const init = async () => {
  const id=route.params.id.toString()
  resetUser()
  resetOrders()
  resetItems()
  await getUser(id)
  await getOrders({userId:id})
  await getItems({userId:id})
  console.log(items)
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
