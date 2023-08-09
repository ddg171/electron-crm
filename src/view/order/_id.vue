<template>
  <el-row align="middle" justify="center" class="page-view">
    <el-col :xs="12">
      <el-card>
        <template #header>
          <el-row>
            <h2>注文詳細</h2>
          </el-row>
        </template>
        <OrderEditForm :initial-value="order" :user="user" :items="items" @show-item-create-modal="showItem"
          @update="init" />
        <ItemCreateModal :show-close="isShownItem" :userId="user?._id" @click-outside="hideItem" @create="itemAdded" />
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>操作</h2>
          </el-row>
        </template>
        <el-row>
          <el-button @click="keepIn" size="large">品物を受け取る。</el-button>
          <el-button @click="abort" size="large">注文をキャンセルする。</el-button>
          <el-button @click="complete" size="large" :disabled="finishBtnDisabled">注文を完了する。</el-button>
        </el-row>
      </el-card>
      <el-card>
        <template #header>
          <el-row>
            <h2>工程管理</h2>
            <el-button @click="showTask">工程追加</el-button>
          </el-row>
        </template>
        <el-row>
          <p></p>
        </el-row>
        <el-row gutter="6">
          <el-col class="task-list" v-for="t in tasks" :key="t._id">
            <TaskCard :task="t" :items="items" @update="initTasks" />
          </el-col>
        </el-row>
        <TaskCreateModal :show-close="isShownTask" :userId="user?._id||null" :orderId="order?._id||null" :items="items"
          @click-outside="hideTask" @create="taskAdded" />
      </el-card>
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
import TaskCreateModal from "../../components/modal/TaskCreate.vue";
import {useModalState} from "../../composables/modal";
import ItemCreateModal from "../../components/modal/ItemCreate.vue";
import TaskCard from "../../components/card/Task.vue";
const route = useRoute()
const {isShown:isShownItem,show:showItem,hide:hideItem} = useModalState()
const {isShown:isShownTask,show:showTask,hide:hideTask} = useModalState()
const {tasks,get:getTasks,reset:resetTasks} = useTasksState()

const itemAdded =async ()=>{
  hideItem()
  await init()
}

const taskAdded =async ()=>{
  hideTask()
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
const complete =async()=>{
  if(!order.value) return
  const id = order.value._id
  await window.orderAPI.complete(id)
  await init()
}
const finishBtnDisabled =computed<boolean>(()=>{
  // 注文が無い
  if(!order.value) return true
  // 注文が進行中でない。
  if(order.value.status !== "inProgress") return true  
  if(tasks.value.length === 0) return false
  // 未完了の工程がある
  const unfinishedTasks = tasks.value.filter(t=>!t.isFinished)
  return unfinishedTasks.length > 0
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
