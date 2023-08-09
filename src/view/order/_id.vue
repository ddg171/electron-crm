<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <h2>注文詳細</h2>
      <el-row>
        <el-col>
          <OrderEditForm :initial-value="order" :user="user" :items="items" @show-item-create-modal="show"
            @update="init" />
          <ItemCreateModal :show-close="isShown" :userId="user?._id" @click-outside="hide" @create="itemAdded" />
        </el-col>
      </el-row>
      <h2>操作</h2>
      <el-row>
        <el-button @click="keepIn">品物を受け取る。</el-button>
        <el-button @click="abort">注文をキャンセルする。</el-button>
      </el-row>
      <h2>工程管理</h2>
      <el-row>
        <ul class="task-list">
          <li v-for="t in tasks" :key="t._id">
            <TaskCard :task="t" :items="items" @update="initTasks" />
          </li>
        </ul>
      </el-row>
      <el-row>
        <TaskCreateForm :userId="user?._id" :orderId="order?._id" :items="orderItems" @submit="initTasks" />
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import{ref,computed} from "vue"
import {useRoute} from 'vue-router';
import {Order} from "../../../electron/model/orders";
import {User} from "../../../electron/model/users";
import {Item} from "../../../electron/model/items";
// import {Task} from "../../../electron/model/tasks";
import {useTasksState} from "../../composables/tasks";
import OrderEditForm from "../../components/form/order/Edit.vue";
import TaskCreateForm from "../../components/form/task/Create.vue";
import {useModalState} from "../../composables/modal";
import ItemCreateModal from "../../components/modal/ItemCreate.vue";
import TaskCard from "../../components/card/Task.vue";
const route = useRoute()
const {isShown,show,hide} = useModalState()
const {tasks,get:getTasks,reset:resetTasks} = useTasksState()

const itemAdded =async ()=>{
  hide()
  await init()
}

const order =ref<Order|null>(null)
const items =ref<Item[]>([])
const user = ref<User|null>(null)

const init = async()=>{
  resetTasks()
  const id =route.params.id.toString()
  const o = await window.orderAPI.findOne(id)
  order.value =o
  await getAllItems(o.userId)
  await getUser(o.userId)
  await getTasks({orderId:id,userId:o.userId})
}

const getUser =async (userId:string)=>{
  const u = await window.userAPI.findOne(userId)
  user.value=u
}

const getAllItems =async(id:string)=>{
  const i = await window.itemAPI.find({userId:id})
  items.value=i
}

const keepIn = async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.keepIn(id)
  await init()
}

const abort = async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.abort(id)
  await init()
}

const orderItems =computed<Item[]>(()=>{
  if(!order.value) return []
  return items.value.filter(i=>order.value?.items.includes(i._id))
})

const initTasks=async ()=>{
  resetTasks()
  await getTasks({orderId:order.value?._id,userId:order.value?.userId})
}

init()

</script>

<style scoped>
.task-list {
  list-style: none;
  width: 100%;
}

#content {
  min-height: calc(25vh - 36px);
}
</style>
